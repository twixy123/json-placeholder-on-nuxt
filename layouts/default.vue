<template>
  <div class="wrapper">
    <div class="wrapper__inner">
      <div class="wrapper__content">
        <Navbar />
        <nuxt />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/layouts/app-navbar'
import Footer from '@/components/layouts/app-footer'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    Footer
  }
}
</script>
