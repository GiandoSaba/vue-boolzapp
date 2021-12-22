const app = new Vue({
    el: '#app',
    data: {
        active: null,
        newMessage: '',
        search: null,
        contacts: [
            {
                name: "Michele",
                avatar: "_1",
                visible: true,
                lastAccess: null,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Hai portato a spasso il cane?",
                        status: "sent",
                        hover: false,
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Ricordati di dargli da mangiare",
                        status: "sent",
                        hover: false,
                    },
                    {
                        date: "10/01/2020 16:15:22",
                        text: "Tutto fatto!",
                        status: "received",
                        hover: false,
                    },
                ],
            },
            {
                name: "Fabio",
                avatar: "_2",
                visible: true,
                lastAccess: null,
                messages: [
                    {
                        date: "20/03/2020 16:30:00",
                        text: "Ciao come stai?",
                        status: "sent",
                        hover: false,
                    },
                    {
                        date: "20/03/2020 16:30:55",
                        text: "Bene grazie! Stasera ci vediamo?",
                        status: "received",
                        hover: false,
                    },
                    {
                        date: "20/03/2020 16:35:00",
                        text: "Mi piacerebbe ma devo andare a fare la spesa.",
                        status: "sent",
                        hover: false,
                    },
                ],
            },
        
            {
                name: "Samuele",
                avatar: "_3",
                visible: true,
                lastAccess: null,
                messages: [
                    {
                        date: "28/03/2020 10:10:40",
                        text: "La Marianna va in campagna",
                        status: "received",
                        hover: false,
                    },
                    {
                        date: "28/03/2020 10:20:10",
                        text: "Sicuro di non aver sbagliato chat?",
                        status: "sent",
                        hover: false,
                    },
                    {
                        date: "28/03/2020 16:15:22",
                        text: "Ah scusa!",
                        status: "received",
                        hover: false,
                    },
                ],
            },
            {
                name: "Luisa",
                avatar: "_4",
                visible: true,
                lastAccess: null,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Lo sai che ha aperto una nuova pizzeria?",
                        status: "sent",
                        hover: false,
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Si, ma preferirei andare al cinema",
                        status: "received",
                        hover: false,
                    },
                ],
            },
            {
                name: "Nicola",
                avatar: "_5",
                visible: false,
                lastAccess: null,
                messages: [],
            },
            {
                name: "Luana",
                avatar: "_6",
                visible: false,
                lastAccess: null,
                messages: [],
            },
            {
                name: "Riccardo",
                avatar: "_7",
                visible: false,
                lastAccess: null,
                messages: [],
            },
            {
                name: "Fernando",
                avatar: "_8",
                visible: false,
                lastAccess: null,
                messages: [],
            },
        ],
        answers: [
            'Per quanto posso vedere, sì',
            'È certo',
            'È decisamente così',
            'Molto probabilmente',
            'Le prospettive sono buone',
            'I segni indicano di sì',
            'Senza alcun dubbio',
            'Sì',
            'sì, senza dubbio',
            'Ci puoi contare',
            'Non ci contare',
            'La mia risposta è no',
            'Le mie fonti dicono di no',
            'Le prospettive non sono buone',
            'Molto incerto'
        ],
        messageSent: false,
        menuClick: false,
    },
    created() {
        this.search = '';
        this.active = 0;
        this.getLastAccessData();
    },
    methods: {
        getLastMessageorDate: function(contact, message) {
            if (this.contacts[contact].messages.length > 0) {
                const messages = this.contacts[contact].messages; 
                const messagesLength = messages.length - 1;
                if (message == 'text') {
                    const lastMessage = messages[messagesLength].text;
                    return lastMessage;
                } else if (message == 'data') {
                    const lastData = messages[messagesLength].date;
                    return lastData;
                }
            } else {
                return '';
            }
        },

        sendNewMessage: function(message, active) {
            this.newMessage = '';
            if (message.trim() !== '') {
                const newMessage = 
                {
                    date: '',
                    text: '',
                    status: "sent",
                    hover: false
                }
                let now = dayjs();
                const data = `${now.format('HH')}:${now.format('mm')}`
                newMessage.date = data;
                newMessage.text = message;
                this.contacts[active].messages.push(newMessage);
                if (!this.messageSent) {
                    setTimeout(() => {
                        this.contacts[active].lastAccess = 'online'
                        setTimeout(() => {
                            this.contacts[active].lastAccess = 'sta digitando..'
                            setTimeout(() => {
                                this.receiveNewMessage(active);
                            }, 1000);
                        }, 2000);
                    }, 2000);
                    this.messageSent = true;
                }

            }
        },

        receiveNewMessage: function(active) {
            const newMessage =
            {
                date: '',
                text: '',
                status: "received",
                hover: false
            }
            let now = dayjs();
            const data = `${now.format('HH')}:${now.format('mm')}`;
            newMessage.date = data;
            newMessage.text = this.getRandomAnswer(this.answers);
            this.contacts[active].messages.push(newMessage);
            
            this.contacts[active].lastAccess = 'online';
            
            setTimeout(() => {
                const now = dayjs();
                this.contacts[active].lastAccess = `Ultimo accesso oggi alle ${now.format('HH')}:${now.format('mm')}`;
                this.messageSent = false;
            }, 3000);
        },

        showContact: function(contact) {
            return (contact.name.toLowerCase().includes(this.search.toLowerCase()));
        },

        getLastAccessData: function() {
            for (let i = 0; i < this.contacts.length; i++) {
                const contact = this.contacts[i];
                const messages = contact.messages;
                messages.forEach(message => {
                    if (message.status == 'received') {
                        this.contacts[i].lastAccess = `Ultimo accesso: ${message.date}`;
                    }
                });
                
            }
        },

        getRandomAnswer: function(array) {
            const min = 0;
            const max = array.length - 1;
            const randomIndex = Math.floor(Math.random() * (max - min) + min);

            return array[randomIndex];
        },

        deleteMessages: function(active) {
            this.menuClick = false;
            this.contacts[active].messages = [];
            
        },

        deleteMessage: function(index) {
            this.contacts[this.active].messages.splice(index, 1);
        },

        deleteChat: function() {
            this.menuClick = false;
            this.contacts[this.active].visible = false;
            this.active = 0;
            while (!this.contacts[this.active].visible) {
                this.active++;
            }

        },

        activeNewChat: function(index) {
            this.active = index;
            this.contacts[index].visible = true;
            this.search = '';
        }

    }
});
