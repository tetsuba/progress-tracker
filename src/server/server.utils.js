
function mergeResolvers(resolvers) {
    const Query = resolvers.reduce((acc, val) => Object.assign(acc, val.Query), {})
    const Mutation = resolvers.reduce((acc, val) => Object.assign(acc, val.Mutation), {})
    return { Query, Mutation }
}

module.exports = {
    mergeResolvers,
};
