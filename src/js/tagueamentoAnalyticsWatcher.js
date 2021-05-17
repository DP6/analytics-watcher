import RW from './script.js';
class Tracker {
    constructor(id) {
        this.id = id;
        this.cid = null;
        this.queue = [];
        this.wasSynced = false;
    }

    async init() {
        const { dp6_cid } = await new Promise((resolve) =>
            chrome.storage.sync.get('dp6_cid', (items) => resolve(items || {}))
        );

        if (dp6_cid) {
            this.cid = dp6_cid;
            this.wasSynced = true;
        } else {
            this.cid = this.generateCid();
            await new Promise((resolve) =>
                chrome.storage.sync.set({ dp6_cid: this.cid }, () => resolve())
            );
        }
        this.queue.forEach((args) => this.sendHit(...args));
    }
    generateCid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function(c) {
                const r = (Math.random() * 16) | 0;
                const v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
    }
    sendHit(params) {
        if (!this.cid) return this.queue.push(arguments);
        if (params.ev === 0) delete params.ev;
        const payload = RW.util.objectToQuery({
            v: 1,
            tid: this.id,
            an: 'Analytics Watcher',
            aid: 'com.dp6.analyticswatcher',
            av: RW.info.version,
            cd: 'Panel',
            cid: this.cid,
            de: document.characterSet,
            ds: 'app',
            sd: `${screen.colorDepth}-bits`,
            sr: `${screen.width}x${screen.height}`,
            ua: navigator.userAgent,
            ul: navigator.language,
            vp: `${window.innerWidth}x${window.innerHeight}`,
            cd3: this.wasSynced ? 'sincronizado' : 'novo',
            ...params,
            z: new Date() | 0,
        });
        navigator.sendBeacon('https://www.google-analytics.com/collect?', payload);
    }
    screenview(cd) {
        const extra = cd ? {} : { cd };
        this.sendHit({ t: 'screenview', ...extra });
    }
    event(ec = '', ea = '', el = '', ev = 0) {
        this.sendHit({
            t: 'event',
            ec,
            ea,
            el,
            ev: ev | 0,
        });
    }
    timing(utc = '', utv = '', utt = 0, utl = '') {
        this.sendHit({
            t: 'timing',
            utc,
            utv,
            utt: utt | 0,
            utl,
        });
    }
}

const ga = new Tracker('UA-3635138-29');
ga.init();
ga.screenview();

jQuery('#logo').mousedown(() => ga.event('Cabeçalho', 'Clique', 'Logo'));

jQuery('#bowser-btn').on('click', () => {
    ga.event('Cabeçalho', 'Clique', 'Penguin DataLayer');
});

jQuery('.filter').on('click', 'a', function() {
    const isChecked = this.closest('li').classList.contains('checked');
    const action = (isChecked ? 'Adicionar' : 'Remover') + ' filtro';
    ga.event('Cabeçalho', action, this.className);
});

jQuery('.clear-filter').on('click', () =>
    ga.event('Cabeçalho', 'Limpar Filtros', 'Limpar Filtros')
);

jQuery('.clear-report').on('click', () => {
    ga.event('Cabeçalho', 'Limpar Relatório', 'Limpar Relatório');
});

jQuery('#busca').on('change', function() {
    if (!this.value) return;
    ga.event('Cabeçalho', 'Busca', 'Busca');
});

RW.panel.on('click', '.track', function() {
    ga.event('Disparos', 'Detalhes', this.classList[1]);
});

RW.panel.on('click', '.delete', function() {
    const track = this.closest('.track');
    ga.event('Disparos', 'Exclusão', track.classList[1]);
});

window.onbeforeunload = function() {
    const time = (performance.now() / 1000) | 0;
    ga.timing('Utilização', 'Tempo de Uso', time, time + 's');
};