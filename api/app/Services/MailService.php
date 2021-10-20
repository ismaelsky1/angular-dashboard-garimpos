<?php

namespace App\Services;

use Mail;
use Exception;
use Illuminate\Http\Response;
use App\Services\Contracts\IMailService;
use App\Repositories\Contracts\IWebServiceRepository;

class MailService implements IMailService
{
    public function sendMail($to, $name, $subject, $text, $link)
    {
        $data = array(
            "name"  => $name,
            "body"  => $text,
            "link"  => env('APP_URL').$link,
        );
        Mail::send('emails.mail', $data, function($message) use ($to, $name, $subject) {
            $message->to($to, $name);
            $message->subject($subject);
        });

        if (Mail::failures())
            throw new Exception("Não foi possível enviar o e-mail. ".Mail::failures());

        return null;
    }

}
