export default {
  state: {
    appLanguage: 'eng',
    languages: {
      eng: {
        idiom: 'en-us',
        app: {
          menuItems: {
            sign_in: 'Sign in',
            sign_up: 'Sign up',
            organize_meetups: 'Organize Meetup',
            view_meetups: 'View Meetups',
            profile: 'Profile',
            logout: 'Logout'
          },
          loading: 'Loading...',
          footer: {
            contact: 'You can contact me @<a href="https://linkedin.com/trepichio" target="blank">LinkedIn</a> if you like it'
          },
          close: 'Close',
          save: 'Save'
        },
        home: {
          explore_btn: 'Explore Meetups',
          organize_btn: 'Organize Meetup',
          main_message: 'Join our awesome meetups!'
        },
        meetups: {
          view_btn: 'View Meetup'
        },
        dateDialog: {
          title: 'Edit Date'
        },
        timeDialog: {
          title: 'Edit Time'
        },
        deleteMeetupDialog: {
          title: 'Delete',
          message_title: '<strong class="red--text text--darken-1">Are you SURE </strong> you want to <strong class="red--text text--darken-1">delete</strong> this Meetup?',
          message_description: 'This action <strong class="red--text text--darken-1">CANNOT BE UNDONE</strong> after you confirm! <strong>Be aware</strong> YOU have been advised.',
          confirm_btn: 'NO! I CHANGED MY MIND',
          cancel_btn: 'YEAH! GET RID OF IT!'
        },
        editMeetupDetailsDialog: {
          title: 'Edit Meetup',
          title_label: 'Title*',
          description_label: 'Description*'

        },
        createMeetup: {
          title: 'Create a new Meetup',
          title_label: 'Title',
          location_label: 'Location',
          description_label: 'Description',
          uploadImage: 'UPLOAD IMAGE',
          confirm_btn: 'Create Meetup'
        },
        signin: {
          password_label: 'Password',
          confirm_btn: 'Sign In'
        },
        signup: {
          password_label: 'Password',
          confirm_password_label: 'Confirm Password'
,          confirm_btn: 'Sign Up'
        },
        registerUserForMeetup: {
          register: 'Register',
          unregister: 'Unregister',
          title: ' for Meetup?',
          warning: 'You need to sign in before registering.',
          signin: 'Sign in',
          warning_message: ' if you already have an account or ',
          signup: 'create one now.',
          message: 'You can always change your decision later on.',
          confirm_btn: 'Confirm',
          cancel_btn: 'Cancel'
        }
      },
      ptbr: {
        idiom: 'pt-br',
        app: {
          menuItems: {
            sign_in: 'Entrar',
            sign_up: 'Cadastrar',
            organize_meetups: 'Organize Evento',
            view_meetups: 'Visualizar Eventos',
            profile: 'Perfil',
            logout: 'Sair'
          },
          loading: 'Carregando...',
          footer: {
            contact: 'Você pode me contatar @<a href="https://linkedin.com/trepichio" target="blank">LinkedIn</a> se desejar.'
          },
          close: 'Fechar',
          save: 'Salvar'
        },
        home: {
          explore_btn: 'Explorar Eventos',
          organize_btn: 'Organize Evento',
          main_message: 'Participe dos nossos incríveis eventos!'
        },
        meetups: {
          view_btn: 'Ver Evento'
        },
        dateDialog: {
          title: 'Edite a Data'
        },
        timeDialog: {
          title: 'Edite o Horário'
        },
        deleteMeetupDialog: {
          title: 'Apagar',
          message_title: '<strong class="red--text text--darken-1">Você tem CERTEZA </strong> que você deseja <strong class="red--text text--darken-1">APAGAR</strong> este evento?',
          message_description: 'Esta ação <strong class="red--text text--darken-1">NÃO PODERÁ SER DESFEITA</strong> após sua confirmação! <strong>Esteja ciente.</strong> VOCÊ foi advertido.',
          confirm_btn: 'NÃO! EU MUDEI DE IDÉIA',
          cancel_btn: 'YEAH! DÊ FIM NISSO!'
        },
        editMeetupDetailsDialog: {
          title: 'Editar Evento',
          title_label: 'Título do Evento*',
          description_label: 'Descrição*'

        },
        createMeetup: {
          title: 'Crie um novo Evento',
          title_label: 'Título',
          location_label: 'Local',
          description_label: 'Descrição',
          uploadImage: 'UPLOAD da Imagem',
          confirm_btn: 'Criar Evento'
        },
        signin: {
          password_label: 'Senha',
          confirm_btn: 'Entrar'
        },
        signup: {
          password_label: 'Senha',
          confirm_password_label: 'Confirme a senha',
          confirm_btn: 'Cadastrar'
        },
        registerUserForMeetup: {
          register: 'Registrar',
          unregister: 'Desregistrar',
          title: ' neste Evento?',
          warning: 'Você precisa entrar com seu usuário antes de registrar.',
          signin: 'Entrar',
          warning_message: ' se você já tem uma conta ou ',
          signup: 'criar uma agora.',
          message: 'Você pode sempre mudar de idéia mais tarde.',
          confirm_btn: 'Confirmar',
          cancel_btn: 'Cancelar'
        }
      }
    },

  },
  getters: {
    appLanguage(state) {
      return state.appLanguage
    },
    locale(state) {
      return state.languages[state.appLanguage]
    }
  },
  mutations: {
     setAppLanguage(state, payload) {
         state.appLanguage = payload
     }
  },
  actions: {
    setAppLanguage({ commit}, payload) {
      commit('setAppLanguage', payload)
    }
  }
};