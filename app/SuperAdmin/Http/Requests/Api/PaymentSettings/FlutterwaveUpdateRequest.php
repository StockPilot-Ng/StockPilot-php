<?php

namespace App\SuperAdmin\Http\Requests\Api\PaymentSettings;

use Illuminate\Foundation\Http\FormRequest;

class FlutterwaveUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */

    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'flutterwave_status'    => 'required',
        ];

        if ($this->flutterwave_status == 'active') {
            $rules['flutterwave_public_key'] = 'required';
            $rules['flutterwave_secret_key'] = 'required';
            $rules['flutterwave_webhook_secret_hash'] = 'required';
        }

        return $rules;
    }
}
