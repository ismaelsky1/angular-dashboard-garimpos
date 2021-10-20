<?php

namespace App\Services\Contracts;

interface IMailService
{
	public function sendMail($to, $name, $subject, $text, $link);
}
