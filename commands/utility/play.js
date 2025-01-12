const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const { joinVoiceChannel, NoSubscriberBehavior, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Joins and plays a song from youtube')
        .addStringOption(option => 
            option.setName('song_name')
                .setDescription('The name of the song you search for')
                .setRequired(true)
        ),

    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) return interaction.channel.send('You need to be in a voice channel!');
        
        const songName = interaction.options.getString('song_name');

        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.member.guild.id,
            adapterCreator: interaction.member.guild.voiceAdapterCreator,
        });

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
            
            if (videoResult.videos.length > 1) {
                if (videoResult.videos.length >=5) {
                    return videoResult.videos.slice(0, 5);
                }
                else {
                    return videoResult.videos;
                }
            }
        }

        const videoOptions = await videoFinder(songName);

        if (videoOptions) {
            const select = new StringSelectMenuBuilder()
                .setCustomId('picker')
                .setPlaceholder('Make a selection!')

            for (let i = 0; i < videoOptions.length; i++) {
                select.addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`${videoOptions[i].author.name} - ${videoOptions[i].title}`)
                        .setValue(videoOptions[i].url)
                        .setDescription(videoOptions[i].description.substring(0, 80))
                );
            }

            const row = new ActionRowBuilder().addComponents(select);

            const response = await interaction.reply({
                content: 'Choose the video you want to play!',
                components: [row],
            });

            const collectorFilter = i => i.user.id === interaction.user.id;

            try {
                const option = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

                const stream = ytdl(option.values[0], {filter: 'audioonly'});
                const resource = createAudioResource(stream, 
                    {
                        inputType: StreamType.Arbitrary,
                        inlineVolume: true
                    });

                const player = createAudioPlayer();
                player.on('subscribe', l => { });
                player.play(resource);
                
                const subscription = connection.subscribe(player);

                if (subscription) {
                    setTimeout(() => subscription.unsubscribe(), 1800_000);
                }
            } catch (e) {
                console.log(e);
                await interaction.editReply({ content: 'Selected no option within 1 minute, cancelling.', components: [] });
            }
        } else {
            message.channel.send('No result found');
        }
    }
}
