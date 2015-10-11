FlowRouter.route('/', {
    name: 'Home',
    action(params) {
        ReactLayout.render(Layout, {
            content: <Home />,
            footer: <Footer />
        });
    }
});