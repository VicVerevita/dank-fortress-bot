const Queue = require('./queue');
const playdl = require('play-dl');
const { createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState} = require('@discordjs/voice');

class SongQueue extends Queue {
    constructor() {
        super(Queue);
        this.currentlyPlaying = false;
        this.player = createAudioPlayer();
    }

    async play(interaction, connection, option) {
        this.player.on('error', error => {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            console.error('Resource metadata:', error.resource.metadata);
        });
        await this.enqueue(option);

        const subscription = await connection.subscribe(this.player);

        if (!this.currentlyPlaying) {
            this.currentlyPlaying = true;
            this.player.play(this.peek().resource).on('stateChange', () => {
                console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
                if(newState === "idle" && oldState === "playing") {
                    console.log('Length of queue:' + this.length);
                    if (this.length === 0) {
                        this.stop();
                    }
                this.dequeue();
                    if (this.length > 0) {
                        this.player.play(this.peek().resource);
                        interaction.reply(`Now playing ${this.peek().option.values[0]}!`);
                    }
                } 
            });
            await interaction.followUp(`Now playing ${this.peek().option.values[0]}!`);
        } else {
            await interaction.followUp(`Added ${this.peekLast().option.values[0]} to queue`);
        }

        await this.player.on('stateChange', (newState, oldState) => {
        });
    }

    skip(interaction) {
        this.dequeue();
        if (this.length > 0) {
            this.player.play(this.peek().resource);
            interaction.reply(`Now playing ${this.peek().option.values[0]}!`);
        } else {
            this.player.stop();
            interaction.reply(`Finished playing the playlist!`);
        }
    }

    pause(interaction) {
        interaction.reply('Playing is now paused');
        this.player.pause();
    }

    resume(interaction) {
        interaction.reply('Playing resumed');
        this.player.unpause();
    }

    async stop(interaction) {
        await interaction.channel.send('Music player stopped');
        this.emptyQueue();
        await this.player.stop();
        this.currentlyPlaying = false;
        subscription.unsubscribe();
    }

    showQueue(interaction) {
        //
    }

    remove(index) {
        this.elements.splice(index, 1);
    }

    async enqueue(option) {
        const stream = await playdl.stream(option.values[0]);
        const resource = createAudioResource(stream.stream, 
            {
                inputType: stream.type,
                inlineVolume: true
            });


        super.enqueue(
            {
                option: option,
                stream: stream,
                resource: resource,
            });
    }

}

module.exports = SongQueue;
