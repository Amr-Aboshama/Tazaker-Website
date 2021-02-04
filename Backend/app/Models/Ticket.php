<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

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

    public static function getReservedTicketsByMatchID($match_id)
    {
        return self::where('match_id', '=', $match_id)
            ->select('seat_row', 'seat_column')
            ->get();
    }

    public static function storeTicket($ticket_data)
    {
        return self::create($ticket_data);
    }

    public static function isSeatReserved($match_id, $seat_row, $seat_column)
    {
        return self::where('match_id', '=', $match_id)
            ->where('seat_row', '=', $seat_row)
            ->where('seat_column', '=', $seat_column)
            ->exists();
    }

    public static function getTicketUserAndMatchId($id)
    {
        return self::where('id', '=', $id)
            ->select('username', 'match_id')
            ->first();
    }

    public static function deleteTicket($id)
    {
        return self::where('id', '=', $id)
            ->delete();
    }
}
