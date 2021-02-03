<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
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
        'username',
        'match_id',
        'seat_row',
        'seat_column',
    ];

    protected $primaryKey = 'username';
    protected $keyType = 'string';

    public static function getReservedTicketsByMatchID($match_id)
    {
        return self::where('match_id', '=', $match_id)
            ->select('seat_row', 'seat_column')
            ->get();
    }
}
