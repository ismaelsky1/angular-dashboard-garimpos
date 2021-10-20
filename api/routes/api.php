<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Garimpos API', 'status' => 'Connected'], 200);
});

Route::get('/doc', function () {
    return redirect('https://labcoding.postman.co/collections/11347191-5f66a617-720c-447f-bcff-54fbd580cead?version=latest&workspace=949c4552-3feb-461d-9a27-15ab2d6bc4a3');
});

Route::post('login', 'AuthController@login');
Route::get('logout', 'AuthController@logout');
Route::post('refreshToken', 'AuthController@refreshToken');

Route::get('forgotPassword/{email}', 'AuthController@forgotPassword');
Route::post('forgotpassword', 'AuthController@changePassword');

Route::get('user/verifiedEmail/{hash}', 'UserController@verifiedEmail');

Route::resource('user', 'UserController');
Route::resource('candidate', 'CandidateController');
Route::resource('candidateexperience', 'CandidateExperienceController');
Route::resource('candidateobjective', 'CandidateObjectiveController');
Route::resource('candidatereward', 'CandidateRewardController');
Route::resource('candidateskill', 'CandidateSkillController');
Route::resource('cbo', 'CboController');
Route::resource('city', 'CityController');
Route::resource('state', 'StateController');
Route::resource('company', 'CompanyController');
Route::resource('consultant', 'ConsultantController');
Route::resource('job', 'JobController');
Route::resource('jobstep', 'JobStepController');
Route::resource('jobstepcandidate', 'JobStepCandidateController');
Route::resource('occupation', 'OccupationController');
Route::resource('profilejob', 'ProfileJobController');
Route::resource('reward', 'RewardController');
Route::resource('salary', 'SalaryController');
Route::resource('subscription', 'SubscriptionController');
Route::resource('workhour', 'WorkHourController');
Route::resource('notification', 'NotificationController');

Route::get('job/{id}/steps', 'JobController@getSteps');

Route::get('candidatereward/{candidate_id}/balance', 'CandidateRewardController@balance');
