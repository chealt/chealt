FlowRouter.route('/', {
    name: 'Home',
    action(params) {
        ReactLayout.render(Layout, {
            footer: <Footer />
        });
    }
});