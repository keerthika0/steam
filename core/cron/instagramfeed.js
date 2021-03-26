require('../../config/connection.js')
require('../../config/settings.js')

const cron = require('node-cron');
const Settings = require('../../db/models/settings');
const Language = require("../../core/language/index");
const Instagram = require('instagram-web-api')

// cron.schedule('*/5 * * * *', async function () {
//     let instagram = await Settings.findOne({ type: 'SITE' });
//     if (instagram) {
//         let feeds = [];
//         const username = "@goldenrosseofficial";
//         const password = "Oldira771962@";
//         const client = new Instagram({ username, password });
//         await client
//             .login()
//             .then(() => {

//                 client.getUserByUsername({ username }).then(async (t) => {
//                     let response = t.edge_owner_to_timeline_media.edges;
//                     for (resp of response) {
//                         await feeds.push({ img: resp.node.display_url, id: resp.node.id, url: "https://www.instagram.com/p/" + resp.node.shortcode });
//                     }
//                     instagram.instagramfeed = feeds.slice(0, 8);
//                     await instagram.save();
//                 })
//             })
//     }
// });



