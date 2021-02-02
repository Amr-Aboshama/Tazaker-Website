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
        'stadium',
        'date',
        'main_referee_id',
        'linesman1_id',
        'linesman2_id',
    ];

    protected $primaryKey = 'name';
    protected $keyType = 'string';


    public static function getMatchDetails($match_id)
    {
        $match = self::where('match_id', '=', $match_id);
        
    }
}
