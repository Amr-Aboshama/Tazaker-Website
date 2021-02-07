<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    public $incrementing = false; //so eloquent doesn't expect your primary key to be an autoincrement primary key.

    public $timestamps = false; // To cancel expectations of updated_at and created_at tables.

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'first_name',
        'last_name',
        'birthdate',
        'gender',
        'city',
        'role',
        'address'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $primaryKey = 'username';
    protected $keyType = 'string';

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }



    /**
     * takes the data of the user then bcrypt its password then create this user
     * and return it.
     *
     * @param array $user_data the data of the user (name,password,email)
     *
     * @return object [ the created user object ].
     */
    public static function storeUser($user_data)
    {
        $user_data['password'] = bcrypt($user_data['password']);

        return self::create($user_data);
    }

    /**
     * return list of users that their name contains a specific subname.
     *
     * @param string $username the subname that we are searching for it
     *
     * @return array [ the list of users that their name contains the subname ].
     */
    public static function getUsersByUsername($username)
    {
        return self::where('username', 'like', '%'.$username.'%')
            ->select('username')
            ->where('username', 'like', '%'.$username.'%')
            ->pluck('username')->toArray();
    }

    /**
     * return the data of a specific user given his/her username.
     *
     * @param string $username the username of the user that we want his/her
     *                         data
     *
     * @return object [ the user object wanted ].
     */
    public static function getUserWholeRecord($username)
    {
        return self::where('username', '=', $username)->first();
    }

    /**
     * return the data of a specific user given his/her email.
     *
     * @param string $email the email of the user that we want his/her
     *                      data
     *
     * @return object [ the user object wanted ].
     */
    public static function getUserWholeRecordByEmail($email)
    {
        try {
            return self::where('email', $email)->first();
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * check if the user exists in the database or not given the username.
     *
     * @param string $username the user we need to check its existance
     *
     * @return bool [ true or false according to the existance of the user ].
     */
    public static function userExist($username)
    {
        $result = self::where('username', $username)->exists();

        return $result;
    }

    /**
     * check if the password entered by the user is right or not.
     *
     * @param string $username the currently logged in user
     * @param string $password the password i need to check its validity
     *
     * @return int [ 1 or 0 according to the success of the update ].
     */
    public static function checkIfPasswordRight($username, $password)
    {
        $hashedpassword = self::select('password')->where('username', $username)->first()->password;

        if (Hash::check($password, $hashedpassword)) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * changes the password of the user.
     *
     * @param array $username
     * @param array $password
     *
     * @return object [ the created user object ].
     */
    public static function changeUserPassword($username, $password)
    {
        $password = bcrypt($password);
        $result = self::where('username', $username)->update(['password' => $password]);

        return $result;
    }

    /**
     * delete account.
     *
     * @param string $username the currently logged in user
     *
     * @return bool [true if the deletion process succeeded, false otherwise]
     */
    public static function deleteAccount($username)
    {
        $result = self::where('username', $username)->delete();

        return $result;
    }

    public static function getNonApprovedManagers(){
        $result = self::where('role','=','Manager')
                    ->where('approved','=',0)
                    ->select('username','email','first_name','last_name')
                    ->get();
        return $result;
    }

    public static function ApproveManager($username){
        $result = self::where('username','=',$username)
                        -> update(['approved' => 1]);
        return $result;
    }

    public static function getNotAdminUsers(){
        $result = self::where('role','=','Manager')->where('approved','=',1)
                        ->orWhere('role','=','Fan')
                        ->select('username','email','first_name','last_name','role')
                        ->get();
        return $result;
    }

    public static function updateUserInfo($username,$first__name,$last__name,$user__birthdate,$user__gender,
                                        $user__city,$user__adress){
        $result = self::where('username','=',$username)
                        ->update(['first_name' => $first__name,'last_name' => $last__name,
                        'birthdate' => $user__birthdate,'gender' => $user__gender,'city' => $user__city,
                        'address' => $user__adress ]);
        return $result;
    }

}
