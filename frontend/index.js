async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  // fetching data //
  const learners = await axios.get('http://localhost:3003/api/learners');
  const mentors = await axios.get('http://localhost:3003/api/mentors');

  // combining data //
  const finalLearnersData = learners.data.map(learner => {
    const mentorsId = mentors.data.filter(mentor => learner.mentors.includes(mentor.id));
    const mentorsFullName = mentorsId.map(mentor => `${mentor.firstName} ${mentor.lastName}`);
    return {...learner, mentors: mentorsFullName};
  });
  console.log(finalLearnersData);

  // updating the info class to inform user no learner is selected //
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected';

  // selected elements // 
  const cards = document.querySelector('.cards');

  // creating a function to make the cards //
  finalLearnersData.forEach(learner => {
    const card = document.createElement('div');
    card.classList.add('card');

    const fullName = document.createElement('h3');
    fullName.textContent = `${learner.fullName}`;

    const email = document.createElement('div');
    email.textContent = `${learner.email}`;

    const mentorsTitle = document.createElement('h4');
    mentorsTitle.classList.add('closed');
    mentorsTitle.textContent = 'Mentors';

    const ul = document.createElement('ul');

    // creating lists inside the ul //
    learner.mentors.forEach(mentor => {
      const li = document.createElement('li');
      li.textContent = `${mentor}`;
      ul.appendChild(li);
    });


    cards.appendChild(card);
    card.appendChild(fullName);
    card.appendChild(email);
    card.appendChild(mentorsTitle);
    card.appendChild(ul);

    // card listener // 
    card.addEventListener('click', () => {
      const selected = document.querySelectorAll('.card.selected');
      if (card.classList.length === 1) {
        selected.forEach(selCard => {
          selCard.classList.remove('selected')});
        card.classList.add('selected');
        info.textContent = `The selected learner is ${learner.fullName}`;
        fullName.textContent = `${learner.fullName}, ID ${learner.id}`;
      } else if (card.classList[1] === 'selected') {
        card.classList.remove('selected');
        info.textContent = 'No learner is selected';
        fullName.textContent = `${learner.fullName}`;
      };
    });

    // mentors drop down listener // 
    mentorsTitle.addEventListener('click', () => {
      if (mentorsTitle.classList[0] === 'closed') {
        mentorsTitle.classList.remove('closed');
        mentorsTitle.classList.add('open');
      } else if (mentorsTitle.classList[0] === 'open') {
        mentorsTitle.classList.remove('open');
        mentorsTitle.classList.add('closed');
      }
    })
  });

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()-1;
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
