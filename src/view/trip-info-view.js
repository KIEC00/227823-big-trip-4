import dayjs from 'dayjs';
import he from 'he';
import AbstractView from '../framework/view/abstract-view';

export default class TripInfoView extends AbstractView {

  #short = false;
  #destinations = null;
  #dateFrom = null;
  #dateTo = null;
  #totalCost = 0;

  constructor({ short, destinations, dateFrom, dateTo, totalCost }) {
    super();
    this.#short = short;
    this.#destinations = destinations;
    this.#dateFrom = dateFrom;
    this.#dateTo = dateTo;
    this.#totalCost = totalCost;
  }

  get template() {
    return createTripInfoTemplate({
      short: this.#short,
      destinations: this.#destinations,
      dateFrom: this.#dateFrom,
      dateTo: this.#dateTo,
      totalCost: this.#totalCost,
    });
  }
}

function createTripInfoTemplate({ short, destinations, dateFrom, dateTo, totalCost }) {
  return /* html */`
    <section class="trip-main__trip-info  trip-info">
      ${createPathTemplate({ short, destinations, dateFrom, dateTo })}
      ${createTotalCostTemplate({ totalCost })}
    </section>
  `;
}

function createPathTemplate({ short, destinations, dateFrom, dateTo }) {
  return /* html */`
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        ${he.encode(short ? `${destinations[0]} — ... — ${destinations[destinations.length - 1]}` : destinations.join(' — '))}</h1>
      <p class="trip-info__dates">${getDateRange(dateFrom, dateTo)}</p>
    </div>
  `;
}

function getDateRange(dateFrom, dateTo) {
  return `${(dayjs(dateFrom)).format('DD MMM')}&nbsp;—&nbsp;${(dayjs(dateTo)).format('DD MMM')}`;
}

function createTotalCostTemplate({ totalCost }) {
  return /* html */`
    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${he.encode(String(totalCost))}</span>
    </p>
  `;
}
