namespacer("uoplanner");

uoplanner.hamburgerMenu = (($, undefined) => {

	const noSearchTermsWarning = "Please try again with some search terms.",
		
		hamburgerToggleHandler = (event) => {
			const $target = $(event.currentTarget),
				$wrapper = $target.closest('.hamburger-menu'),
				$menu = $wrapper.find('nav');
			$menu.toggle();

			console.log($menu);
		},

		searchToggleHandler = event => {
			$(".modal-wrapper.search").addClass('active');
		},

		searchDismissHandler = event => {
			$(".modal-wrapper.search").removeClass('active');
		},
		
		searchHandler = event => {
			const $searchBox = $('#searchBox'),
				searchValue = $searchBox.val();

			if (!searchValue) {
				warn(noSearchTermsWarning, true);
				return;
			}

			window.location = '/search?q=' + encodeURIComponent(searchValue);
		},

		warn = warning => {
			const $warning = $('.modal-wrapper.search .warning');
			$warning.find('p').text(warning);
			$warning.slideDown(250, () => {
				setTimeout(() => {
					$('.modal-wrapper.search .warning').slideUp(250);
				}, 1500);
			});
		},

		init = () => {
			$('.hamburger-menu button.menu').on('click', hamburgerToggleHandler);
			$('.hamburger-menu button.search').on('click', searchToggleHandler);
			$('.modal-wrapper.search .close').on('click', searchDismissHandler);
			$('#searchButton').on('click', searchHandler);
		};

	return { init };

})(jQuery);

$(() => { uoplanner.hamburgerMenu.init(); });