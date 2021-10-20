<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
		// Repositories
		$this->app->bind('App\Repositories\Contracts\ICandidateRepository', 'App\Repositories\CandidateRepository');
		$this->app->bind('App\Repositories\Contracts\ICandidateExperienceRepository', 'App\Repositories\CandidateExperienceRepository');
		$this->app->bind('App\Repositories\Contracts\ICandidateObjectiveRepository', 'App\Repositories\CandidateObjectiveRepository');
		$this->app->bind('App\Repositories\Contracts\ICandidateRewardRepository', 'App\Repositories\CandidateRewardRepository');
		$this->app->bind('App\Repositories\Contracts\ICandidateSkillRepository', 'App\Repositories\CandidateSkillRepository');
		$this->app->bind('App\Repositories\Contracts\ICboRepository', 'App\Repositories\CboRepository');
		$this->app->bind('App\Repositories\Contracts\ICityRepository', 'App\Repositories\CityRepository');
		$this->app->bind('App\Repositories\Contracts\IStateRepository', 'App\Repositories\StateRepository');
		$this->app->bind('App\Repositories\Contracts\ICompanyRepository', 'App\Repositories\CompanyRepository');
		$this->app->bind('App\Repositories\Contracts\IConsultantRepository', 'App\Repositories\ConsultantRepository');
		$this->app->bind('App\Repositories\Contracts\IJobRepository', 'App\Repositories\JobRepository');
		$this->app->bind('App\Repositories\Contracts\IJobStepRepository', 'App\Repositories\JobStepRepository');
		$this->app->bind('App\Repositories\Contracts\IJobStepCandidateRepository', 'App\Repositories\JobStepCandidateRepository');
		$this->app->bind('App\Repositories\Contracts\IOccupationRepository', 'App\Repositories\OccupationRepository');
		$this->app->bind('App\Repositories\Contracts\IProfileJobRepository', 'App\Repositories\ProfileJobRepository');
		$this->app->bind('App\Repositories\Contracts\IRewardRepository', 'App\Repositories\RewardRepository');
		$this->app->bind('App\Repositories\Contracts\ISalaryRepository', 'App\Repositories\SalaryRepository');
		$this->app->bind('App\Repositories\Contracts\ISubscriptionRepository', 'App\Repositories\SubscriptionRepository');
		$this->app->bind('App\Repositories\Contracts\IUserRepository', 'App\Repositories\UserRepository');
		$this->app->bind('App\Repositories\Contracts\IWorkHourRepository', 'App\Repositories\WorkHourRepository');
		$this->app->bind('App\Repositories\Contracts\INotificationRepository', 'App\Repositories\NotificationRepository');

        // Services
        $this->app->bind('App\Services\Contracts\IMailService', 'App\Services\MailService');

		$this->app->bind('App\Services\Contracts\ICandidateService', 'App\Services\CandidateService');
		$this->app->bind('App\Services\Contracts\ICandidateExperienceService', 'App\Services\CandidateExperienceService');
		$this->app->bind('App\Services\Contracts\ICandidateObjectiveService', 'App\Services\CandidateObjectiveService');
		$this->app->bind('App\Services\Contracts\ICandidateRewardService', 'App\Services\CandidateRewardService');
		$this->app->bind('App\Services\Contracts\ICandidateSkillService', 'App\Services\CandidateSkillService');
		$this->app->bind('App\Services\Contracts\ICboService', 'App\Services\CboService');
		$this->app->bind('App\Services\Contracts\ICityService', 'App\Services\CityService');
		$this->app->bind('App\Services\Contracts\IStateService', 'App\Services\StateService');
		$this->app->bind('App\Services\Contracts\INotificationService', 'App\Services\NotificationService');
		$this->app->bind('App\Services\Contracts\ICompanyService', 'App\Services\CompanyService');
		$this->app->bind('App\Services\Contracts\IConsultantService', 'App\Services\ConsultantService');
		$this->app->bind('App\Services\Contracts\IJobService', 'App\Services\JobService');
		$this->app->bind('App\Services\Contracts\IJobStepService', 'App\Services\JobStepService');
		$this->app->bind('App\Services\Contracts\IJobStepCandidateService', 'App\Services\JobStepCandidateService');
		$this->app->bind('App\Services\Contracts\IOccupationService', 'App\Services\OccupationService');
		$this->app->bind('App\Services\Contracts\IProfileJobService', 'App\Services\ProfileJobService');
		$this->app->bind('App\Services\Contracts\IRewardService', 'App\Services\RewardService');
		$this->app->bind('App\Services\Contracts\ISalaryService', 'App\Services\SalaryService');
		$this->app->bind('App\Services\Contracts\ISubscriptionService', 'App\Services\SubscriptionService');
		$this->app->bind('App\Services\Contracts\IUserService', 'App\Services\UserService');
		$this->app->bind('App\Services\Contracts\IWorkHourService', 'App\Services\WorkHourService');
		$this->app->bind('App\Services\Contracts\INotificationService', 'App\Services\NotificationService');

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
