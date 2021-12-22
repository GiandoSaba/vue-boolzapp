const app = new Vue({
    el: '#app',
    data: {
        lastAccess: '',
        active: null,
        newMessage: '',
        contacts: [
            {
                name: "Michele",
                avatar: "_1",
                visible: true,
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
    },
    created() {
        this.active = 0;
        const active = this.active;
        this.lastAccess = 'Ultimo accesso il ' + this.getLastMessageorDate(active, 'data');
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
                const data = `${now.date()}/${now.month()}/${now.year()} ${now.hour()}:${now.minute()}:${now.second()}`
                newMessage.date = data;
                newMessage.text = message;
                this.contacts[active].messages.push(newMessage);
                
                setTimeout(() => {
                    this.receiveNewMessage(active);
                }, 1000);
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
            const data = `${now.date()}/${now.month()}/${now.year()} ${now.hour()}:${now.minute()}:${now.second()}`
            newMessage.date = data;
            newMessage.text = 'Ok';
            this.contacts[active].messages.push(newMessage);
        }

    }
});
