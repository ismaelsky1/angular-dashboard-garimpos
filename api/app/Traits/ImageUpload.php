<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait ImageUpload
{
    public function uploadOne(UploadedFile $uploadedFile, $folder = null, $disk = 'public', $filename = null)
    {
        $name = !is_null($filename) ? $filename : Str::random(25);

        $file = $uploadedFile->storeAs($folder, $name.'.'.$uploadedFile->getClientOriginalExtension(), $disk);

        return $file;
    }

    private function uploadBase64($base64, $des_img, $default = null, $nameImg = null)
	{
		$extension = explode('/', $base64);
		if ($extension[0] != 'data:image')
			return $default;

        $extension = explode(';', $extension[1]);
        $extension = '.'.$extension[0];
		$name = $nameImg != null ? $nameImg : uniqid(date('HisYmd'));
		$folder = 'storage/';
		$filePath = $folder . $name. $extension;
		$base64 = preg_replace('#^data:image/[^;]+;base64,#', '', $base64);

		if (!file_put_contents($filePath, base64_decode($base64)))
			throw new Exception('Não foi possível realizar o upload da imagem. '.$des_img);

		return $filePath;
	}
}
