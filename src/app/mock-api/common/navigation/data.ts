/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        subtitle: 'Noticias recientes del sistema',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboards.project',
                title: 'Noticias',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/dashboards/project'
            }
        ]
    },
    {
        id      : 'apps',
        title   : 'Variables Ambientales',
        subtitle: 'Recopilación de datos climáticos',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'apps.calendar',
                title   : 'Meteorología',
                subtitle: 'Mapa de estaciones meteorológicas',
                type    : 'basic',
                icon    : 'heroicons_outline:calendar',
                link    : '/apps/calendar'
            }
        ]
    },

    {
        id      : 'apps',
        title   : 'Imagenes',
        subtitle: 'Monitoreo visual',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'apps.monitoreo',
                title   : 'Tiempo Real',
                type    : 'basic',
                icon    : 'heroicons_outline:calendar',
                link    : '/monitoreo'
            },
            {
                id   : 'apps.contacts',
                title: 'Histórico',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/apps/contacts'
            }
            
        ]
    },
    {
        id      : 'apps',
        title   : 'Geomática',
        subtitle: 'Información vectorial y raster',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'apps.calendar',
                title   : 'Geoportal',
                type    : 'basic',
                icon    : 'heroicons_outline:calendar',
                link    : '/apps/calendar'
            },
            {
                id   : 'apps.contacts',
                title: 'Datos vectoriales',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/apps/contacts'
            },
            {
                id   : 'apps.contacts',
                title: 'Datos Raster',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/apps/contacts'
            }
            
        ]
    },
    
    {
        id      : 'gs',
        title   : 'Gestión Social',
        subtitle: 'Mapeo de actores internos y externos',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'gs.social',
                title: 'Actores',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/social'
            },
            {
                id   : 'dashboards.analytics',
                title: 'Mapa de Actores',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboards/analytics'
            }
        ]
    },
    {
        id      : 'apps',
        title   : 'Inventarios',
        subtitle: 'Estadisticas de los inventarios',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'apps.calendar',
                title   : 'Glaciares',
                type    : 'basic',
                icon    : 'heroicons_outline:calendar',
                link    : '/apps/calendar'
            },
            {
                id   : 'apps.contacts',
                title: 'Bofedales',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/apps/contacts'
            },
            {
                id   : 'apps.contacts',
                title: 'Lagunas glaciares',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/apps/contacts'
            } 
        ]
    },
    {
        id   : 'example',
        title: 'Repositorio',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    },
    {
        id   : 'example2',
        title: 'Inaigem Watch',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
    
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
