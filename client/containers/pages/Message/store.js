import { observable, action, autorun } from 'mobx';
import { app } from '../../../app'

class MessageStore {
  @observable messages = []

  @action getMessages = () => {
    app.service('messages').find({
      query: {
        $sort: { createdAt: -1 },
        $limit: 10
      }}).then(page => this.messages = page.data.reverse())
  }

}

const store = new MessageStore;

export default store;
