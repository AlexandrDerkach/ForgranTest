TestPageCommon =
{
	CURRENCY_USD: 'USD',
	CURRENCY_RUB: 'RUB',
	CURRENCY_EUR: 'EUR',
	CURRENCY_GBP: 'GBP',

	CURRENCY_USD_UNICODE: '&#36;',
	CURRENCY_RUB_UNICODE: '&#8381',
	CURRENCY_EUR_UNICODE: '&#128;',
	CURRENCY_GBP_UNICODE: '&#163;',

	COIN_TYPE_BITCOIN: 'BITCOIN',
	COIN_TYPE_ETHEREUM: 'ETHEREUM',
	COIN_TYPE_LITECOIN: 'LITECOIN',

	BTC_BLOCK_SELECTOR: 'js-bitcoin-block',
	ETH_BLOCK_SELECTOR: 'js-ethereum-block',
	LTC_BLOCK_SELECTOR: 'js-litecoin-block',

	getSelectChangeContainer: function(obj)
	{
		return $(obj).closest('.js-exchange-select');
	},

	getExchangeInnerContainer: function(obj)
	{
		return $(obj).closest('.js-exchange-inner');
	},

	selectExchangeItem: function(obj)
	{
		var el = $(obj);
		var container = TestPageCommon.getSelectChangeContainer(obj);
		var elLiWrap = el.closest('li');
		var elWrapSiblings = elLiWrap.siblings('.js-select-list-item');
		var elId = container.find('.js-selected-item-id');
		var currentItem = container.find('.js-exchange-select-item');
		var list = container.find('.js-select-list');

		list.hide();

		if(!elLiWrap.hasClass('list-item-active'))
		{
			elLiWrap.addClass('list-item-active');
		}

		elWrapSiblings.removeClass('list-item-active');

		if(elId.val())
		{
			elId.val('')
		}

		elId.val(el.html());

		if(currentItem.html())
		{
			currentItem.html('')
		}

		currentItem.html(el.html());

		TestPageCommon.getExchangeRequestData(el, elId.val());
	},

	openDropExchangeList: function(obj)
	{
		var container = TestPageCommon.getSelectChangeContainer(obj);
		var list = container.find('.js-select-list');

		if(list.is(':visible'))
		{
			list.hide();
		}
		else
		{
			list.show();
		}
	},

	showCurrentItemOnReady: function()
	{
		var activeItem = $('.list-item-active');
		var currentItem = $('.js-exchange-select-item');
		var currentItemVal = activeItem.find('a').html();
		var elId = $('.js-selected-item-id');

		if(activeItem)
		{
			elId.val(currentItemVal);
			currentItem.html(currentItemVal);
		}
	},

	initSwitchClickWorking: function(obj)
	{
		var el = $(obj);
		var slider = el.find('.js-exchange-slider');
		var container = TestPageCommon.getExchangeInnerContainer(obj);
		var currency = container.find('.js-selected-item-id').val();
		var currentBlock = el.closest('.js-exchange-inner-block');
		var coinTypeVal = currentBlock.find('.js-coin-type-val').val();
		var isPercent = null;


		if(!slider.hasClass('switch-checked'))
		{
			slider.addClass('switch-checked');
			isPercent = true;
		}
		else
		{
			slider.removeClass('switch-checked');
			isPercent = false;
		}


		TestPageCommon.getExchangeRequestData(obj, currency, coinTypeVal);
		TestPageCommon.percentPointsManipulation(currentBlock, isPercent, currency);
	},

	getExchangeRequestData: function(obj, currency, coinTypeVal)
	{
		var container = TestPageCommon.getExchangeInnerContainer(obj);

		switch (coinTypeVal)
		{
			case TestPageCommon.COIN_TYPE_BITCOIN:
				TestPageCommon.getBitcoinRequestData(container, currency);
				break;
			case TestPageCommon.COIN_TYPE_ETHEREUM:
				TestPageCommon.getEthereumRequestData(container, currency);
				break;
			case TestPageCommon.COIN_TYPE_LITECOIN:
				TestPageCommon.getLiteRequestData(container, currency);
				break;
			default:
				TestPageCommon.getBitcoinRequestData(container, currency);
				TestPageCommon.getEthereumRequestData(container, currency);
				TestPageCommon.getLiteRequestData(container, currency);
		}
	},

	changeCurrencyShortNameByRequestResult: function(currency, currentBlock, isChangeTypePoint)
	{
		var currName = null;

		if(isChangeTypePoint)
		{
			currName = currentBlock.find('.js-short-type-points-name');
		}
		else
		{
			currName = currentBlock.find('.js-short-currency-name');
		}

		switch(currency)
		{
			case TestPageCommon.CURRENCY_USD:
				currName.html(TestPageCommon.CURRENCY_USD_UNICODE);
			break;

			case TestPageCommon.CURRENCY_RUB:
				currName.html(TestPageCommon.CURRENCY_RUB_UNICODE);
			break;

			case TestPageCommon.CURRENCY_EUR:
				currName.html(TestPageCommon.CURRENCY_EUR_UNICODE);
			break;

			case TestPageCommon.CURRENCY_GBP:
				currName.html(TestPageCommon.CURRENCY_GBP_UNICODE);
			break;
		}
	},

	percentPointsManipulation: function(currentBlock, isPercent, currency)
	{
		var pointName = currentBlock.find('.js-short-type-points-name');
		if(isPercent)
		{
			pointName.html('%');
		}
		else
		{
			TestPageCommon.changeCurrencyShortNameByRequestResult(currency, currentBlock, true);
		}
	},

	getBitcoinRequestData: function(container, currency)
	{
		var currentBlock = container.find('.js-bitcoin-block');
		var currencyUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTC' + currency;

		TestPageCommon.requestToApi(currentBlock, currency, currencyUrl);

	},

	getEthereumRequestData: function(container, currency)
	{
		var currentBlock = container.find('.js-ethereum-block');
		var currencyUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/ETH' + currency;

		TestPageCommon.requestToApi(currentBlock, currency, currencyUrl);
	},

	getLiteRequestData: function(container, currency)
	{
		var currentBlock = container.find('.js-litecoin-block');
		var currencyUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTC' + currency;

		TestPageCommon.requestToApi(currentBlock, currency, currencyUrl);
	},

	requestToApi: function(currentBlock, currency, currencyUrl)
	{
		var switchCondition = currentBlock.find('.js-exchange-slider').hasClass('switch-checked');

		var exchangeDynamicFields =
		{
			price: currentBlock.find('.js-price--value'),
			hourChanges: currentBlock.find('.js-hour-changes-value'),
			dayChanges: currentBlock.find('.js-day-changes-value'),
			weekChanges: currentBlock.find('.js-week-changes-value'),
			monthChanges: currentBlock.find('.js-month-changes-value')
		};


		var currencyInfo =
		{
			last: null,
			hour: null,
			day: null,
			week: null,
			month: null
		};

		TestPageCommon.requestBody(currencyUrl, switchCondition, exchangeDynamicFields, currencyInfo, currentBlock, currency);
	},

	requestBody: function(url, switchCondition, exchangeDynamicFields, currencyInfo, currentBlock, currency)
	{
		$.ajax({
			url: url,
			dataType: 'json',
			success: function(results)
			{
				if(switchCondition)
				{
					TestPageCommon.getPercentValues(currencyInfo, results);
				}
				else
				{
					TestPageCommon.getNumbersValues(currencyInfo, results);
				}

				currencyInfo.last = results.last;

			},
			complete: function()
			{
				TestPageCommon.fillDynamecExchangeFields(exchangeDynamicFields, currencyInfo);

				var dynamicElArr =
					[
						exchangeDynamicFields.price,
						exchangeDynamicFields.hourChanges,
						exchangeDynamicFields.dayChanges,
						exchangeDynamicFields.weekChanges,
						exchangeDynamicFields.monthChanges
					];

				TestPageCommon.checkForNegativeVal(dynamicElArr);

				TestPageCommon.percentPointsManipulation(currentBlock, switchCondition, currency);
				TestPageCommon.changeCurrencyShortNameByRequestResult(currency, currentBlock, false);
			}
		});
	},

	fillDynamecExchangeFields: function(exchangeDynamicFields, currencyInfo)
	{
		exchangeDynamicFields.price.html(currencyInfo.last);
		exchangeDynamicFields.hourChanges.html(currencyInfo.hour);
		exchangeDynamicFields.dayChanges.html(currencyInfo.day);
		exchangeDynamicFields.weekChanges.html(currencyInfo.week);
		exchangeDynamicFields.monthChanges.html(currencyInfo.month);
	},

	checkForNegativeVal: function(dynamicElArr)
	{
		for(var i = 0; i < dynamicElArr.length; i++)
		{
			if(dynamicElArr[i].html() < 0 || !dynamicElArr[i].html())
			{
				dynamicElArr[i].closest('div').addClass('red');
			}
			else
			{
				dynamicElArr[i].closest('div').removeClass('red');
			}

			if(!dynamicElArr[i].html())
			{
				dynamicElArr[i].html('-')
			}
		}
	},

	getPercentValues: function(currencyInfo, results)
	{
		currencyInfo.hour = results.changes.percent.hour;
		currencyInfo.day = results.changes.percent.day;
		currencyInfo.week = results.changes.percent.week;
		currencyInfo.month = results.changes.percent.month;
	},

	getNumbersValues: function(currencyInfo, results)
	{
		currencyInfo.hour = results.changes.price.hour;
		currencyInfo.day = results.changes.price.day;
		currencyInfo.week = results.changes.price.week;
		currencyInfo.month = results.changes.price.month;
	},

	initPreloader: function()
	{
		var el = $("#hellopreloader_preload");

		el.css('opacity', 1);

		var interhellopreloader = setInterval(function()
		{
			el.css('opacity', el.css('opacity') - 0.05);
			if(el.css('opacity') <= 0.05)
			{
				clearInterval(interhellopreloader);
				el.css('display', 'none');
			}
		}, 16);
	}
};

TestPageSupOnReady =
{
	loadCurrencyInfo: function()
	{
		var currency = $('.js-selected-item-id').val();
		TestPageSupOnReady.initSwitchOnLoadWorking();
		TestPageSupOnReady.getExchangeRequestDataById(currency);
	},

	getExchangeRequestDataById: function(currency)
	{
		TestPageSupOnReady.getBitcoinRequestDataById(currency);
		TestPageSupOnReady.getEthereumRequestDataById(currency);
		TestPageSupOnReady.getLiteRequestDataById(currency);
	},

	getBitcoinRequestDataById: function(currency)
	{
		var currentBlock = $('#bitcoinBlock');
		var currencyUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTC' + currency;

		TestPageCommon.requestToApi(currentBlock, currency, currencyUrl);
	},

	getEthereumRequestDataById: function(currency)
	{

		var currentBlock = $('#ethereumBlock');
		var currencyUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/ETH' + currency;

		TestPageCommon.requestToApi(currentBlock, currency, currencyUrl);
	},

	getLiteRequestDataById: function(currency)
	{
		var currentBlock = $('#litecoinBlock');
		var currencyUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTC' + currency;

		TestPageCommon.requestToApi(currentBlock, currency, currencyUrl);
	},

	initSwitchOnLoadWorking: function()
	{
		var container = $('#exchangeInner');
		var currency = container.find('.js-selected-item-id').val();
		var currentBlock = container.find('.js-exchange-inner-block');
		var slider = currentBlock.find('.js-exchange-slider');
		var isPercent = null;

		for(var i = 0; i < currentBlock.length; i++)
		{
			if(!slider.eq(i).hasClass('switch-checked'))
			{
				slider.eq(i).addClass('switch-checked');
				isPercent = true;
			}
			else
			{
				slider.eq(i).removeClass('switch-checked');
				isPercent = false;
			}

			var pointName = currentBlock.eq(i).find('.js-short-type-points-name');

			if(isPercent)
			{
				pointName.html('%');
			}
			else
			{
				TestPageCommon.changeCurrencyShortNameByRequestResult(currency, currentBlock.eq(i), true)
			}
		}

		TestPageSupOnReady.getExchangeRequestDataById(currency);
	}
};

function bindEvents()
{
	$(window).on('load', function()
	{
		setTimeout(function()
		{
			TestPageCommon.initPreloader();
		}, 500);
	});
	$(document).ready(
		function()
		{
			TestPageCommon.showCurrentItemOnReady();
		}
	);
	$(document).ready(
		function()
		{
			TestPageSupOnReady.loadCurrencyInfo();
		}
	);
}