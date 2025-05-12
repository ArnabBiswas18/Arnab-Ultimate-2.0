const WelcomeSettings = require('../models/welcome/WelcomeSettings');
const { EmbedBuilder } = require('discord.js');

/**
 * Helper Functions
 */
function getOrdinalSuffix(number) {
    if ([11, 12, 13].includes(number % 100)) return 'th';
    const lastDigit = number % 10;
    return ['st', 'nd', 'rd'][lastDigit - 1] || 'th';
}

function truncateUsername(username, maxLength = 15) {
    return username.length > maxLength ? `${username.slice(0, maxLength)}...` : username;
}

const gifThumbnails = [
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334809888479772724/Anime_Water_gif.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334809980779499560/Blade_Runner_2049.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810010928287794/Blue_Background_Anime_Lights.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810062773817404/download_1.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810122651701299/download_2.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810248384348221/download_3.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810248829210655/download_4.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810249328066570/download_5.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810309117874236/download_6.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810309566926858/download_7.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810309986095155/download_8.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810310388875335/download_9.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810498067206195/download_10.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810498595684414/download.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810498968850495/Howls_Moving_Castle.gif',
    'https://cdn.discordapp.com/attachments/1334801232358936628/1334810499367436308/Register_-_Login.gif'
];

function getRandomGif() {
    return gifThumbnails[Math.floor(Math.random() * gifThumbnails.length)];
}

/**
 * Main Member Join Handler
 */
module.exports = async function memberJoinHandler(client) {
    client.on('guildMemberAdd', async (member) => {
        try {
            const guildId = member.guild.id;
            const welcomeSettings = await WelcomeSettings.findOne({ serverId: guildId });

            if (!welcomeSettings?.channelStatus || !welcomeSettings.welcomeChannelId) return;

            const welcomeChannel = member.guild.channels.cache.get(welcomeSettings.welcomeChannelId);
            if (!welcomeChannel) return;

            const user = member.user;
            const memberCount = member.guild.memberCount;
            const suffix = getOrdinalSuffix(memberCount);
            const username = truncateUsername(user.username);
            const joinDate = member.joinedAt.toDateString();
            const creationDate = user.createdAt.toDateString();
            const heartIcon = 'https://cdn.discordapp.com/attachments/1180451693872287817/1334800525069389864/hearts-red-e.gif';
            const gif = getRandomGif();

            const welcomeEmbed = new EmbedBuilder()
                .setTitle("Welcome!")
                .setDescription(`${member}, You are the **${memberCount}${suffix}** member of our server!`)
                .setColor("#00e5ff")
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setImage(gif)
                .addFields(
                    { name: 'Username', value: username, inline: true },
                    { name: 'Join Date', value: joinDate, inline: true },
                    { name: 'Account Created', value: creationDate, inline: true }
                )
                .setFooter({ text: "We're glad to have you here!", iconURL: heartIcon })
                .setAuthor({ name: username, iconURL: user.displayAvatarURL() })
                .setTimestamp();

            await welcomeChannel.send({
                content: `Hey ${member}!`,
                embeds: [welcomeEmbed]
            });

        } catch (error) {
            console.error('❌ Error in member join handler:', error);
        }
    });
};
