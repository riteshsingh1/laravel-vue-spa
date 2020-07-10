{{-- You can change this template using File > Settings > Editor > File and Code Templates > Code > Laravel Ideal Markdown Mail --}}
@component('mail::message')
# Introduction

The body of your message.

@component('mail::button', ['url' => ''])
Button Text
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
