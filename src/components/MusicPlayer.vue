    <template>
        <v-container class="music-player">
        <v-card class="mx-auto" max-width="600" elevation="0">
            <v-card-title class="headline">Music Player</v-card-title>
            <v-card-text>
            <v-row class="track-info" justify="center">
                <v-col cols="12" class="text-center">
                <v-img
                    :src="currentTrack.image"
                    max-width="200"
                    class="mx-auto mb-4"
                ></v-img>
                <h2>{{ currentTrack.title }}</h2>
                <p>{{ currentTrack.artist }}</p>
                </v-col>
            </v-row>
            <audio ref="audio" :src="currentTrack.url" @timeupdate="updateTime"></audio>
            <v-row justify="center" class="controls">
                <v-icon large class="ma-2" @click="prevTrack">mdi-skip-previous</v-icon>
                <v-icon large class="ma-2" @click="playPause">{{ isPlaying ? 'mdi-pause-circle' : 'mdi-play-circle' }}</v-icon>
                <v-icon large class="ma-2" @click="stop">mdi-stop-circle</v-icon>
                <v-icon large class="ma-2" @click="nextTrack">mdi-skip-next</v-icon>
            </v-row>
            <v-row class="progress" align="center" justify="center">
                <v-col cols="2" class="text-center">{{ formatTime(currentTime) }}</v-col>
                <v-col cols="8">
                <v-slider
                    v-model="currentTime"
                    :max="currentTrack.duration"
                    @input="seek"
                    class="mx-4"
                    color="orange"
                ></v-slider>
                </v-col>
                <v-col cols="2" class="text-center">{{ formatTime(currentTrack.duration) }}</v-col>
            </v-row>
            </v-card-text>
        </v-card>
        </v-container>
    </template>
    
    <script>
    export default {
        data() {
        return {
            isPlaying: false,
            currentTime: 0,
            currentTrackIndex: 0,
            tracks: [
            {
                title: 'Best Part (Audio)',
                artist: 'Daniel Caesar ft. H.E.R',
                url: 'public/music/Daniel Caesar - Best Part (Audio) ft. H.E.R..mp3',
                duration: 240, // Duration in seconds
                image: 'public/unnamed.jpg' // Add the path to the track's image
            },
            {
                title: 'Track 2',
                artist: 'Artist 2',
                url: 'path/to/track2.mp3',
                duration: 300,
                image: 'public/images/track2.jpg'
            },
            // Add more tracks as needed
            ]
        };
        },
        computed: {
        currentTrack() {
            return this.tracks[this.currentTrackIndex];
        }
        },
        methods: {
        playPause() {
            const audio = this.$refs.audio;
            if (this.isPlaying) {
            audio.pause();
            } else {
            audio.play();
            }
            this.isPlaying = !this.isPlaying;
        },
        stop() {
            const audio = this.$refs.audio;
            audio.pause();
            audio.currentTime = 0;
            this.isPlaying = false;
        },
        prevTrack() {
            this.currentTrackIndex =
            (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
            this.resetTrack();
        },
        nextTrack() {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
            this.resetTrack();
        },
        resetTrack() {
            const audio = this.$refs.audio;
            audio.pause();
            audio.currentTime = 0;
            this.currentTime = 0;
            if (this.isPlaying) {
            audio.play();
            }
        },
        updateTime() {
            this.currentTime = this.$refs.audio.currentTime;
        },
        seek() {
            this.$refs.audio.currentTime = this.currentTime;
        },
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }
        },
        watch: {
        currentTime(newTime) {
            const audio = this.$refs.audio;
            if (Math.abs(audio.currentTime - newTime) > 1) {
            audio.currentTime = newTime;
            }
        }
        }
    };
    </script>
    
    <style scoped>
    
    .track-info h2 {
        font-size: 20px;
        margin: 10px 0;
    }
    .track-info p {
        font-size: 16px;
        margin: 0;
        color: #ccc;
    }
    .controls {
        margin-bottom: 20px;
    }
    .controls .v-icon {
        cursor: pointer;
        color: #ff9100;
        transition: color 0.3s;
    }
    .controls .v-icon:hover {
        color: #e68000;
    }
    .progress {
        margin-top: 20px;
    }
    </style>
    