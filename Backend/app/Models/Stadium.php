<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stadium extends Model
{
    use HasFactory;

    public $incrementing = false; //so eloquent doesn't expect your primary key to be an autoincrement primary key.

    public $timestamps = false; // To cancel expectations of updated_at and created_at tables.

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'row_count',
        'column_count',
    ];

    protected $primaryKey = 'name';
    protected $keyType = 'string';

    public static function storeStadium($name, $width, $length)
    {
        $stadium = self::create([
            'name' => $name,
            'row_count' => $length,
            'column_count' => $width,
        ]);

        $stadium['length'] = $stadium->row_count;
        $stadium['width'] = $stadium->column_count;

        unset($stadium['row_count']);
        unset($stadium['column_count']);
        return $stadium;
    }

    public static function getStadiums()
    {
        return self::all();
    }

    public static function getStadiumShape($stadium_name)
    {
        return self::where('name', '=', $stadium_name)
            ->select('row_count', 'column_count')
            ->get()
            ->first();
    }
}
