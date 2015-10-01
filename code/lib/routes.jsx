FlowRouter.route('/', {
    name: 'Home',
    action(params) {
        ReactLayout.render(Layout, {
            header: <Header />,
            content: <Home />,
            footer: <Footer />
        });
    }
});