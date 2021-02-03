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
            ->get()
            ->first();

        }

    public static function getMatches()
    {
        return self::select('id', 'home_team', 'away_team', 'date')
        ->get();
    }

    public static function getMatchStadium($match_id)
    {
        return self::where('id', '=', $match_id)
            ->select('match_venue')
            ->pluck('match_venue')
            ->first();
    }
}
