#!/usr/bin/env python
# coding: utf-8
import pandas as pd
import numpy as np

from r_models import (
    ARIMA,
    ETS,
    ThetaF,
    Naive,
    SeasonalNaive
)
from meta_model import (
    MetaModels,
    temp_holdout,
    calc_errors,
    get_prediction_panel
)


def prepare_meta_models(seasonality):

    X_train_df, y_train_df, X_test_df, y_test_df

    # Preparing errors
    y_holdout_train_df, y_val_df = temp_holdout(y_train_df, validation_periods)
    meta_models = {
        'ARIMA': ARIMA(freq=seasonality, stepwise=False, approximation=False),
        'ETS': ETS(freq=seasonality),
        'ThetaF': ThetaF(freq=seasonality),
        'Naive': Naive(freq=seasonality),
        'SeasonalNaive': SeasonalNaive(freq=seasonality),
        'Naive2': Naive2(seasonality=seasonality)
    }
    validation_meta_models = MetaModels(meta_models)
    validation_meta_models.fit(train)
    prediction_validation_meta_models = validation_meta_models.predict(y_val_df)

    #Calculating actual predictins
    meta_models = MetaModels(meta_models)
    meta_models.fit(y_train_df)
    predictions = meta_models.predict(y_test_df[['unique_id', 'ds']])
