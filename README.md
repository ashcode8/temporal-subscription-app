**What is this project —>**

1. To build a realistic monthly subscription payments app that can be canceled and changed while it runs. We assume it’s a **cell-phone plan subscription** here.
Requirements - 
        
    1. When the user signs up, **send a welcome email** and start a free trial for `TrialPeriod`.
    2. When the `TrialPeriod` expires, start the billing process
        - If the user cancels during the trial, **send a trial cancellation email**.
    3. Billing Process:
        - As long as you have not exceeded `MaxBillingPeriods`,
        - **Charge the customer** for the `BillingPeriodChargeAmount`.
        - Then wait for the next `BillingPeriod`.
        - If the customer cancels during a billing period, **send a subscription cancellation email**.
        - If Subscription has ended normally (exceeded `MaxBillingPeriods` without cancellation), **send a subscription ended email**.
    4. At any point while subscriptions are ongoing, be able to look up and change any customer's:
        - Amount Charged
        - Period number (for manual adjustments e.g. refunds)
    
    Of course, this all has to be fault tolerant, scalable to millions of customers, testable, maintainable, and observable.

2. How to run this project
   1. clone this git repo
   2. inside root-directory - `npm install`
   3. open 3 different shells
      a. first - run the worker - `npm start`
      b. seconds - run the workflow - `npm run workflow`
      c. third - either - query or signal the workflow with
          1.  `npm run sub-cancel` - to cancel a subscription plan
          2. `npm run trial-cancel` - to cancel a trial plan
          3. `npm run get-info` - to get current billing info of subcription
