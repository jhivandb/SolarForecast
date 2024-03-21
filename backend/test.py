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




meta_models = {
    'ARIMA': ARIMA(freq=seasonality, stepwise=False, approximation=False),
    'ETS': ETS(freq=seasonality),
    'ThetaF': ThetaF(freq=seasonality),
    'Naive': Naive(freq=seasonality),
    'SeasonalNaive': SeasonalNaive(freq=seasonality),
    'Naive2': Naive2(seasonality=seasonality)
}
