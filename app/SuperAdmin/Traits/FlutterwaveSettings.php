<?php

namespace App\SuperAdmin\Traits;

use App\SuperAdmin\Models\GlobalSettings;
use Illuminate\Support\Facades\Config;

trait FlutterwaveSettings
{
    public function setFlutterwaveConfigs()
    {
        $flutterwaveSettings = GlobalSettings::where('setting_type', 'payment_settings')
            ->where('name_key', 'flutterwave')
            ->first();
        $settings = (object) $flutterwaveSettings->credentials;

        $publicKey = ($settings->flutterwave_public_key) ? $settings->flutterwave_public_key : env('FLW_PUBLIC_KEY');
        $secretKey = ($settings->flutterwave_secret_key) ? $settings->flutterwave_secret_key : env('FLW_SECRET_KEY');
        $secretHash = ($settings->flutterwave_webhook_secret_hash) ? $settings->flutterwave_webhook_secret_hash : env('FLW_SECRET_HASH');

        Config::set('flutterwave.publicKey', $publicKey);
        Config::set('flutterwave.secretKey', $secretKey);
        Config::set('flutterwave.secretHash', $secretHash);
    }
}
