<template>

  <div class="settings q-py-lg">
    <div class="position-relative full-width">
      <q-scroll-area class="absolute full-height full-width">
        <q-list class="q-my-lg">
          <q-item-label header class="text-black">User Controls</q-item-label>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Content filtering</q-item-label>
              <q-item-label caption>
                Set the content filtering level to restrict apps that can be
                downloaded
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Password</q-item-label>
              <q-item-label caption>
                Require password for purchase or use password to restrict
                purchase
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header>General</q-item-label>

          <q-item tag="label" v-ripple>
            <q-item-section side top>
              <q-checkbox v-model="check1" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Notifications</q-item-label>
              <q-item-label caption>
                Notify me about updates to apps or games that I downloaded
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section side top>
              <q-checkbox v-model="check2" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Sound</q-item-label>
              <q-item-label caption>
                Auto-update apps at anytime. Data charges may apply
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section side top>
              <q-checkbox v-model="check3" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Auto-add widgets</q-item-label>
              <q-item-label caption>
                Automatically add home screen widgets
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header>Notifications</q-item-label>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Battery too low</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle color="blue" v-model="notif1" val="battery" />
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Friend request</q-item-label>
              <q-item-label caption>Allow notification</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-toggle color="green" v-model="notif2" val="friend" />
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Picture uploaded</q-item-label>
              <q-item-label caption
                >Allow notification when uploading images</q-item-label
              >
            </q-item-section>
            <q-item-section side top>
              <q-toggle color="red" v-model="notif3" val="picture" />
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header>Other settings</q-item-label>

          <q-item>
            <q-item-section side>
              <q-icon color="teal" name="volume_down" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="volume"
                :min="0"
                :max="10"
                label
                color="teal"
              />
            </q-item-section>
            <q-item-section side>
              <q-icon color="teal" name="volume_up" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="deep-orange" name="brightness_medium" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="brightness"
                :min="0"
                :max="10"
                label
                color="deep-orange"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>


          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>
                    <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>
                    <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>





          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
  </div>



  <!-- <div class="settings">
    <div class=" position-relative full-height full-width">
      <q-scroll-area class="absolute full-height full-width">
        <q-list bordered padding>
          <q-item-label header>User Controls</q-item-label>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Content filtering</q-item-label>
              <q-item-label caption>
                Set the content filtering level to restrict apps that can be
                downloaded
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Password</q-item-label>
              <q-item-label caption>
                Require password for purchase or use password to restrict
                purchase
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header>General</q-item-label>

          <q-item tag="label" v-ripple>
            <q-item-section side top>
              <q-checkbox v-model="check1" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Notifications</q-item-label>
              <q-item-label caption>
                Notify me about updates to apps or games that I downloaded
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section side top>
              <q-checkbox v-model="check2" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Sound</q-item-label>
              <q-item-label caption>
                Auto-update apps at anytime. Data charges may apply
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section side top>
              <q-checkbox v-model="check3" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Auto-add widgets</q-item-label>
              <q-item-label caption>
                Automatically add home screen widgets
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header>Notifications</q-item-label>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Battery too low</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle color="blue" v-model="notif1" val="battery" />
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Friend request</q-item-label>
              <q-item-label caption>Allow notification</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-toggle color="green" v-model="notif2" val="friend" />
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Picture uploaded</q-item-label>
              <q-item-label caption
                >Allow notification when uploading images</q-item-label
              >
            </q-item-section>
            <q-item-section side top>
              <q-toggle color="red" v-model="notif3" val="picture" />
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header>Other settings</q-item-label>

          <q-item>
            <q-item-section side>
              <q-icon color="teal" name="volume_down" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="volume"
                :min="0"
                :max="10"
                label
                color="teal"
              />
            </q-item-section>
            <q-item-section side>
              <q-icon color="teal" name="volume_up" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="deep-orange" name="brightness_medium" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="brightness"
                :min="0"
                :max="10"
                label
                color="deep-orange"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
  </div> -->
</template>

<script setup>
import { ref } from "vue";

const check1 = ref(true);
const check2 = ref(false);
const check3 = ref(false);

const notif1 = ref(true);
const notif2 = ref(true);
const notif3 = ref(false);

const volume = ref(6);
const brightness = ref(3);
const mic = ref(8);
</script>

<style lang="scss">
.settings {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  width: 50%;
  height: 100vh;
  background: $grey-7;
  z-index: 2;
}
</style>