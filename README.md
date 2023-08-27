# Monthly Subscription App

**What is this project —>**

To build a realistic monthly subscription payments workflow that can be canceled and changed while it runs. We assume it’s a **cell-phone plan subscription** here.

Requirements - 
    
    Our task is to write a Workflow for a limited time Subscription (eg a 36 month Phone plan) that satisfies these conditions:
    
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

