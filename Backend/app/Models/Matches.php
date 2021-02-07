<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matches extends Model
{
    use HasFactory;

    protected $table = 'matches';

    public $timestamps = false; // To cancel expectations of updated_at and created_at tables.

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'home_team',
        'away_team',
        'match_venue',
        'date',
        'time',
        'main_referee',
        'first_linesman',
        'second_linesman',
    ];

    public static function storeMatch($match_details)
    {
        return self::create($match_details);
    }

    public static function getMatchDetails($match_id)
    {
        return self::where('id', '=', $match_id)
            ->get();

        }

    public static function getMatches()
    {
        return self::all();
    }

    public static function getMatchStadium($match_id)
    {
        return self::where('id', '=', $match_id)
            ->select('match_venue')
            ->pluck('match_venue')
            ->first();
    }

    public static function getMatchDate($match_id)
    {
        return self::where('id', '=', $match_id)
            ->select('date', 'time')
            ->first();
    }

    public static function updateMatch($match_id,$home__team,$away__team,$match__venue,$match__date,
                                        $match__time,$main__referee,$first__linesman,$second__linesman){
        return self::where('id','=',$match_id)
                    ->update(['home_team'=> $home__team,'away_team' => $away__team ,'match_venue'=> $match__venue ,
                    'date'=> $match__date, 'time'=> $match__time, 'main_referee'=> $main__referee,
                    'first_linesman'=> $first__linesman, 'second_linesman'=> $second__linesman ]);
    }
}
