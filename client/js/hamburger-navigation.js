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
			$("#template-search-modal").addClass('active');
		},

		searchDismissHandler = event => {
			$("#template-search-modal").removeClass('active');
		},

		init = () => {
			$('.hamburger-menu button.menu').on('click', hamburgerToggleHandler);
			$('.hamburger-menu button.search').on('click', searchToggleHandler);
			$('.modal-wrapper.search .close').on('click', searchDismissHandler);
		};

	return { init };

})(jQuery);

$(() => { uoplanner.hamburgerMenu.init(); });