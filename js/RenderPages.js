export class RenderPages {
    constructor(){
        this.root = document.getElementById('root');
    }
    renderAuthOrRegistr(){
        
        const form = document.createElement('form');
        form.classList.add('AOR');
        const h2 = document.createElement('h2');
        h2.innerText = 'Registration or Authorizatoin';
        h2.classList.add('AOR');
        const container = document.createElement('div');
        container.classList.add('containerAOR');
        const linkRegistr = document.createElement('a');
        linkRegistr.setAttribute('id', 'registration');
        linkRegistr.innerText = 'Registration';
        linkRegistr.classList.add('AOR');
        const linkAuth = document.createElement('a');
        linkAuth.setAttribute('id', 'authorization');
        linkAuth.innerText = 'Authorizatoin';
        linkAuth.classList.add('AOR');
        this.root.appendChild(form);
        form.appendChild(h2);
        form.appendChild(container);
        container.appendChild(linkRegistr);
        container.appendChild(linkAuth);
    }
    renderAuthorization(){
        const form = document.createElement('form');
        form.classList.add('Auth');
        form.onsubmit = function(){
          return false
        }
        const h2 = document.createElement('h2');
        h2.innerText = 'Authorizatoin';
        const labelForNickname = document.createElement('label');
        labelForNickname.classList.add('Auth');
        labelForNickname.innerText ='Write your nickname';
        labelForNickname.setAttribute('for', 'nickname');
        const labelForPassword = document.createElement('label');
        labelForPassword.classList.add('Auth');
        labelForPassword.innerText ='Write your password';
        labelForPassword.setAttribute('for', 'password');
        const inputNickname = document.createElement('input');
        inputNickname.classList.add('Auth');
        inputNickname.type= 'text';
        inputNickname.name = 'nickname';
        inputNickname.required = true;
        inputNickname.placeholder = 'Write your nickname';
        inputNickname.setAttribute('id', 'nickname');
        const inputPassword = document.createElement('input');
        inputPassword.classList.add('Auth');
        inputPassword.type= 'password';
        inputPassword.name = 'password';
        inputPassword.required = true;
        inputPassword.placeholder = 'Write your password';
        inputPassword.setAttribute('id', 'password');
        const buttonSend = document.createElement('button');
        buttonSend.classList.add('Auth');
        buttonSend.setAttribute('id', 'Auth');
        buttonSend.innerText = 'Authorizatoin';
      
        this.root.appendChild(form);
        form.appendChild(h2);
        form.appendChild(labelForNickname);
        form.appendChild(inputNickname);
        form.appendChild(labelForPassword);
        form.appendChild(inputPassword);
        form.appendChild(buttonSend);
    }
    renderRegistration(){
        const form = document.createElement('form');
        form.classList.add('Registr');
        form.onsubmit = function(){
          return false;
        }
        const h2 = document.createElement('h2');
        h2.innerText = 'Registration';
        const labelName = document.createElement('label');
        labelName.classList.add('Registr')
        labelName.innerText = 'Name';
        labelName.setAttribute('for', "name");
        const inputName = document.createElement('input');
        inputName.classList.add('Registr')
        inputName.placeholder = 'Write your name';
        inputName.required = 'true';
        inputName.setAttribute('name', 'name');
        inputName.setAttribute('id', 'name');
        inputName.type = 'text';
      
        const labelSurname = document.createElement('label');
        labelSurname.classList.add('Registr')
        labelSurname.innerText = 'Surname';
        labelSurname .setAttribute('for', "surname");
        const inputSurname = document.createElement('input');
        inputSurname.classList.add('Registr')
        inputSurname.placeholder = 'Write your surname';
        inputSurname.required = 'true';
        inputSurname.setAttribute('name', 'surname');
        inputSurname.setAttribute('id', 'surname');
        inputSurname.type = 'text';
      
        const labelNickname = document.createElement('label');
        labelNickname.classList.add('Registr')
        labelNickname.innerText = 'Nickname';
        labelNickname.setAttribute('for', "nickname");
        const inputNickname = document.createElement('input');
        inputNickname.classList.add('Registr')
        inputNickname.placeholder = 'Write your nickname';
        inputNickname.required = 'true';
        inputNickname.setAttribute('name', 'nickname');
        inputNickname.setAttribute('id', 'nickname');
        inputNickname.type = 'text';
      
        const labelPassword = document.createElement('label');
        labelPassword.classList.add('Registr')
        labelPassword.innerText = 'Password';
        labelPassword.setAttribute('for', "password");
        const inputPassword = document.createElement('input');
        inputPassword.classList.add('Registr')
        inputPassword.placeholder = 'Write your password';
        inputPassword.required = 'true';
        inputPassword.setAttribute('name', 'password');
        inputPassword.setAttribute('id', 'password');
        inputPassword.type = 'password';
      
        const btnSend = document.createElement('button');
        btnSend.classList.add('Registr')
        btnSend.setAttribute('id', "send");
        btnSend.innerText = "Send";
      
        this.root.appendChild(form);
        form.appendChild(h2);
        form.appendChild(labelName);
        form.appendChild(inputName);
        form.appendChild(labelSurname);
        form.appendChild(inputSurname);
        form.appendChild(labelNickname);
        form.appendChild(inputNickname);
        form.appendChild(labelPassword);
        form.appendChild(inputPassword);
        form.appendChild(btnSend);
    }
}
