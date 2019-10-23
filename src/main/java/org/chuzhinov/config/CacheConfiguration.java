package org.chuzhinov.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(org.chuzhinov.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(org.chuzhinov.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(org.chuzhinov.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(org.chuzhinov.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(org.chuzhinov.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(org.chuzhinov.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(org.chuzhinov.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            createCache(cm, org.chuzhinov.domain.Station.class.getName());
            createCache(cm, org.chuzhinov.domain.Station.class.getName() + ".stationTrains");
            createCache(cm, org.chuzhinov.domain.StationTrain.class.getName());
            createCache(cm, org.chuzhinov.domain.Ticket.class.getName());
            createCache(cm, org.chuzhinov.domain.Train.class.getName());
            createCache(cm, org.chuzhinov.domain.Train.class.getName() + ".stationTrains");
            createCache(cm, org.chuzhinov.domain.Train.class.getName() + ".tickets");
            createCache(cm, org.chuzhinov.domain.Passenger.class.getName());
            createCache(cm, org.chuzhinov.domain.Passenger.class.getName() + ".tickets");
            // jhipster-needle-ehcache-add-entry
        };
    }
}
