const menuItems = [
    { key: 0, name: 'Chealt', link: '/' },
    { key: 1, name: 'Profile', link: '/profile' }
];

FlowRouter.route('/', {
    name: 'Home',
    action(params) {
        ReactLayout.render(Layout, {
            menuItems: menuItems,
            title: 'Chealt - Home',
            content(filter) {
                return (
                    <Home 
                        filter={filter} />
                );
            }
        });
    }
});

FlowRouter.route('/profile', {
    name: 'Profile',
    action(params) {
        ReactLayout.render(Layout, {
            menuItems: menuItems,
            title: 'Chealt - Profile Page',
            content() {
                return (
                    <ProfilePage />
                );
            }
        });
    }
});