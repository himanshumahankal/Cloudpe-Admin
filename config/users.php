<?php

return [
    'OneTimePasswordAuthenticator.login' => true,
    'Users.Social.login' => true,
    'OAuth.providers.google.options.clientId' => env('GOOGLE_CLIENT_ID','test-client-id'),
    'OAuth.providers.google.options.clientSecret' => env('GOOGLE_CLIENT_SECRET','test-client-secret'),
];
