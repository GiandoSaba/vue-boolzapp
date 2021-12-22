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
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Ricordati di dargli da mangiare",
                        status: "sent",
                    },
                    {
                        date: "10/01/2020 16:15:22",
                        text: "Tutto fatto!",
                        status: "received",
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
                    },
                    {
                        date: "20/03/2020 16:30:55",
                        text: "Bene grazie! Stasera ci vediamo?",
                        status: "received",
                    },
                    {
                        date: "20/03/2020 16:35:00",
                        text: "Mi piacerebbe ma devo andare a fare la spesa.",
                        status: "sent",
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
                    },
                    {
                        date: "28/03/2020 10:20:10",
                        text: "Sicuro di non aver sbagliato chat?",
                        status: "sent",
                    },
                    {
                        date: "28/03/2020 16:15:22",
                        text: "Ah scusa!",
                        status: "received",
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
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Si, ma preferirei andare al cinema",
                        status: "received",
                    },
                ],
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
        ]
    },
    created() {
        this.active = 0;
        this.getLastAccessData();
    },
    methods: {
        getLastMessageorDate: function(contact, message) {
            const messages = this.contacts[contact].messages; 
            const messagesLength = messages.length - 1;
            if (message == 'text') {
                const lastMessage = messages[messagesLength].text;
                return lastMessage;
            } else if (message == 'data') {
                const lastData = messages[messagesLength].date;
                return lastData;
            }
        },

        sendNewMessage: function(message, active) {
            this.newMessage = '';
            if (message.trim() !== '') {
                const newMessage = 
                {
                    date: '',
                    text: '',
                    status: "sent"
                }
                let now = dayjs();
                const data = `${now.format('HH')}:${now.format('mm')}`
                newMessage.date = data;
                newMessage.text = message;
                this.contacts[active].messages.push(newMessage);
                setTimeout(() => {
                    this.contacts[active].lastAccess = 'online'
                    setTimeout(() => {
                        this.contacts[active].lastAccess = 'sta digitando..'
                        setTimeout(() => {
                            this.receiveNewMessage(active);
                        }, 1000);
                    }, 2000);
                }, 2000);

            }
        },

        receiveNewMessage: function(active) {
            const newMessage =
            {
                date: '',
                text: '',
                status: "received"
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
            }, 3000);
        },

        showContact: function(contact) {
            const name = contact.name.toLowerCase();
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
        }

    }
});
