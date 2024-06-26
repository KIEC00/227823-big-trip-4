import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';

import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import PointCreationStateModel from './model/point-creation-state-model.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripApiService from './trip-api-service.js';

const AUTHORIZATION = 'Basic bda8df0e-7278-5c3e-86d6-8924fa646147';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const tripApiService = new TripApiService(END_POINT, AUTHORIZATION);

const headerTripContainer = document.querySelector('.trip-main');
const filterContainer = headerTripContainer.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');

const destinationsModel = new DestinationsModel(tripApiService);
const offersModel = new OffersModel(tripApiService);
const pointsModel = new PointsModel(tripApiService, destinationsModel, offersModel);

const filterModel = new FilterModel();
const pointCreationStateModel = new PointCreationStateModel();

const tripInfoPresenter = new TripInfoPresenter({
  container: headerTripContainer,
  pointsModel,
  destinationsModel,
  offersModel,
});
const filterPresenter = new FilterPresenter({
  container: filterContainer,
  filterModel,
  pointsModel,
});
const newPointButtonPresenter = new NewPointButtonPresenter({
  container: headerTripContainer,
  pointsModel,
  pointCreationStateModel,
});
const tripPresenter = new TripPresenter({
  container: tripContainer,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  pointCreationStateModel,
});

tripInfoPresenter.init();
filterPresenter.init();
newPointButtonPresenter.init();
tripPresenter.init();

pointsModel.init();
