const {agentProvider, fixtureManager, matchers} = require('../../utils/e2e-framework');
const recommendationsService = require('../../../core/server/services/recommendations');
const {Recommendation} = require('@tryghost/recommendations');
const {anyObjectId, anyISODateTime} = matchers;

describe('Recommendations Content API', function () {
    let agent;

    before(async function () {
        agent = await agentProvider.getContentAPIAgent();
        await fixtureManager.init('api_keys');
        await agent.authenticate();

        // Clear placeholders
        for (const recommendation of (await recommendationsService.repository.getAll())) {
            recommendation.delete();
            await recommendationsService.repository.save(recommendation);
        }

        // Add 7 recommendations using the repository
        for (let i = 0; i < 7; i++) {
            const recommendation = Recommendation.create({
                title: `Recommendation ${i}`,
                reason: `Reason ${i}`,
                url: new URL(`https://recommendation${i}.com`),
                favicon: null,
                featuredImage: null,
                excerpt: null,
                oneClickSubscribe: false
            });

            await recommendationsService.repository.save(recommendation);
        }
    });

    it('Can paginate recommendations', async function () {
        await agent.get(`recommendations/`)
            .expectStatus(200)
            .matchHeaderSnapshot({
                'content-version': matchers.anyContentVersion,
                etag: matchers.anyEtag
            })
            .matchBodySnapshot({
                recommendations: new Array(5).fill({
                    id: anyObjectId,
                    created_at: anyISODateTime,
                    updated_at: anyISODateTime
                })
            });

        await agent.get(`recommendations/?page=2`)
            .expectStatus(200)
            .matchHeaderSnapshot({
                'content-version': matchers.anyContentVersion,
                etag: matchers.anyEtag
            })
            .matchBodySnapshot({
                recommendations: new Array(2).fill({
                    id: anyObjectId,
                    created_at: anyISODateTime,
                    updated_at: anyISODateTime
                })
            });
    });
});
