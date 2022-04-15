<template>
  <header>
    <div class="container">
      <div class="row">
        <Logo
          :class="[
            'col',
            $style['header-logo']
          ]"
        />
        <h2
          :class="[
            'col',
            $style['header-title']
          ]"
        >
          Посты
        </h2>
        <Search :class="$style['search']" />
        <nav
          :class="[
            $style['nav'],
            'col'
          ]"
        >
          <nuxt-link to="/" :class="$style['nav__link']">
            <SvgIcon
              :class="$style['nav__icon']"
              name="grid-row-2"
            />
            Посты
          </nuxt-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '@/components/Logo'
export default {
  name: 'AppNavbar',
  components: {
    Logo
  }
}
</script>

<style lang="scss" module>
.search {
  margin-left: auto;

  @include xs-block {
    margin-right: auto;
    width: 100%;
    padding: 0 $col-gap-xs;
    margin-top: 20px;
  }
}

.nav {
  margin-left: calc(90px - $col-gap);

  &__link {
    color: $clr-pink;
    text-decoration: none;
  }

  &__icon {
    margin-right: 7px;
  }

  @include xs-block {
    display: none;
  }
}

.header-logo {
  @include xs-block {
    display: none;
  }
}

.header-title {
  display: none;
  font-size: 32px;
  line-height: 1.125;
  font-weight: 700;
  width: 100%;

  @include xs-block {
    display: block;
  }
}
</style>
