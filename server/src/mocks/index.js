import fake from 'faker';

import Tweet from '../models/Tweet';
import User from '../models/User';

const TWEET_TOTAL = 4;
const USERS_TOTAL = 4;

export default async () => {
        try {
                await Tweet.remove();
                await User.remove();

                await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
                        const user = await User.create({
                                username: fake.internet.userName(),
                                firstName: fake.name.firstName(),
                                lastName: fake.name.lastName(),
                                avatar: `https://randomuser.me/api/porraits/women/${i}.jpg`,
                                password: 'hykaru123',
                                email: fake.internet.email(),
                        });

                        await Array.from({ length: TWEET_TOTAL }).forEach(
                                async () => { await Tweet.create({ text: fake.lorem.sentence(), user: user._id }) },
                        );
                });
        } catch (err) {
                throw err;
        }
}