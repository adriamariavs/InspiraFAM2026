/* =========================================================
   SCRIPT.JS — INSPIRA FAM EXPERIENCE 2026

   01. Reveal ao rolar
   02. Voltar ao topo
   03. Experiências
   04. Modal das experiências
   05. Inscrições
   06. Formulários
   07. Mapa interativo
   08. Touch no mapa
   09. Legenda do mapa
   10. Modal do mapa
   11. Fechar modais
   12. Programação
========================================================= */


/* =========================================================
   01. REVEAL AO ROLAR
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");

          revealObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    (element, index) => {

      element.style.transitionDelay =
        `${Math.min(index % 5, 4) * 70}ms`;

      revealObserver.observe(element);

    }
  );

} else {

  revealElements.forEach(
    (element) => {

      element.classList.add("visible");

    }
  );

}



/* =========================================================
   02. VOLTAR AO TOPO
========================================================= */

document
  .querySelectorAll(
    'a[href="#top"], .back-to-top'
  )
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });

      }
    );

  });



/* =========================================================
   03. EXPERIÊNCIAS
========================================================= */

const stageMascot =
  document.querySelector(
    ".stage-mascot"
  );


const experienceItems =
  document.querySelectorAll(
    ".experience-item"
  );


experienceItems.forEach((item) => {


  /* DESKTOP */

  item.addEventListener(
    "mouseenter",
    () => {

      if (!stageMascot) {
        return;
      }

      let rotation = 5;


      switch (item.dataset.tone) {

        case "purple":
          rotation = -12;
          break;

        case "yellow":
          rotation = 8;
          break;

        case "pink":
          rotation = -6;
          break;

        case "orange":
          rotation = 10;
          break;

        default:
          rotation = 5;

      }


      stageMascot.style.transform =
        `scale(1.18) rotate(${rotation}deg)`;

    }
  );


  item.addEventListener(
    "mouseleave",
    () => {

      if (!stageMascot) {
        return;
      }

      stageMascot.style.transform = "";

    }
  );


  /* MOBILE */

  item.addEventListener(
    "touchstart",
    () => {

      item.classList.add(
        "touch-active"
      );

    },
    {
      passive: true
    }
  );


  item.addEventListener(
    "touchend",
    () => {

      setTimeout(
        () => {

          item.classList.remove(
            "touch-active"
          );

        },
        180
      );

    },
    {
      passive: true
    }
  );


});



/* =========================================================
   04. MODAL DAS EXPERIÊNCIAS
========================================================= */

const experienceModal =
  document.getElementById(
    "experience-modal"
  );


const experienceNumber =
  document.getElementById(
    "experience-modal-number"
  );


const experienceTitle =
  document.getElementById(
    "experience-modal-title"
  );


const experienceText =
  document.getElementById(
    "experience-modal-text"
  );


const experienceClose =
  document.querySelector(
    ".experience-modal-close"
  );


const experienceContinue =
  document.getElementById(
    "experience-modal-button"
  );



/* =========================================================
   CONTEÚDO DAS EXPERIÊNCIAS
========================================================= */

const experienceContent = {


  interativas: {

    number: "01",

    title:
      "Experiências interativas",

    text:
      "Ativações, dinâmicas e ações para participar de verdade. Aqui, você não fica só olhando: experimenta, testa, interage e descobre."

  },


  exposicoes: {

    number: "02",

    title:
      "Exposições",

    text:
      "Projetos, trabalhos e ideias ganham espaço para serem vistos de perto. Um convite para conhecer novas criações e diferentes olhares."

  },


  gastronomia: {

    number: "03",

    title:
      "Foodtrucks & gastronomia",

    text:
      "Sabores também fazem parte da experiência. Aproveite as opções gastronômicas e os momentos de pausa ao longo do evento."

  },


  networking: {

    number: "04",

    title:
      "Networking",

    text:
      "Um espaço para encontrar pessoas, trocar ideias e aproximar estudantes, visitantes, profissionais, marcas e oportunidades."

  },


  musica: {

    number: "05",

    title:
      "Música & apresentações",

    text:
      "Momentos ao vivo, atrações e apresentações ajudam a criar o ritmo de cada noite do Inspira FAM."

  },


  marcas: {

    number: "06",

    title:
      "Marcas & projetos",

    text:
      "Conheça expositores, parceiros, negócios, produtos e iniciativas que fazem parte da experiência."

  },


  /* Compatibilidade com versões anteriores */

  expositores: {

    number: "06",

    title:
      "Marcas & projetos",

    text:
      "Conheça expositores, parceiros, negócios, produtos e iniciativas que fazem parte da experiência."

  },


  atividades: {

    number: "01",

    title:
      "Experiências interativas",

    text:
      "Ativações, dinâmicas e ações especiais para participar, experimentar e descobrir."

  }


};



/* =========================================================
   ABRIR MODAL DAS EXPERIÊNCIAS
========================================================= */

document
  .querySelectorAll(
    "[data-experience]"
  )
  .forEach((item) => {

    item.addEventListener(
      "click",
      () => {

        const key =
          item.dataset.experience;


        const content =
          experienceContent[key];


        if (
          !content ||
          !experienceModal
        ) {

          return;

        }


        if (experienceNumber) {

          experienceNumber.textContent =
            content.number;

        }


        if (experienceTitle) {

          experienceTitle.textContent =
            content.title;

        }


        if (experienceText) {

          experienceText.textContent =
            content.text;

        }


        experienceModal.dataset.tone =
          item.dataset.tone || "";


        if (
          typeof experienceModal.showModal ===
          "function"
        ) {

          experienceModal.showModal();

        }

      }
    );

  });



/* =========================================================
   FECHAR MODAL DAS EXPERIÊNCIAS
========================================================= */

experienceClose
  ?.addEventListener(
    "click",
    () => {

      experienceModal?.close();

    }
  );


experienceContinue
  ?.addEventListener(
    "click",
    () => {

      experienceModal?.close();

    }
  );



/* =========================================================
   05. INSCRIÇÕES
========================================================= */

const formSection =
  document.getElementById(
    "forms"
  );


const visitorForm =
  document.getElementById(
    "visitor-form"
  );


const commercialForm =
  document.getElementById(
    "commercial-form"
  );


const formHeading =
  document.getElementById(
    "form-heading"
  );


const formTitle =
  document.getElementById(
    "form-title"
  );


const formDescription =
  document.getElementById(
    "form-description"
  );


const success =
  document.getElementById(
    "form-success"
  );


const successMascot =
  document.getElementById(
    "success-mascot"
  );


const successKicker =
  document.getElementById(
    "success-kicker"
  );


const successTitle =
  document.getElementById(
    "success-title"
  );


const successDescription =
  document.getElementById(
    "success-description"
  );


const choiceButtons =
  document.querySelectorAll(
    "[data-form]"
  );



/* =========================================================
   ABRIR FORMULÁRIO
========================================================= */

function openForm(type) {


  if (!formSection) {
    return;
  }


  const isCommercial =
    type === "commercial";


  formSection.classList.remove(
    "is-hidden"
  );


  formSection.setAttribute(
    "aria-hidden",
    "false"
  );


  if (success) {

    success.hidden = true;

  }


  if (formHeading) {

    formHeading.style.display = "";

  }


  visitorForm?.classList.toggle(
    "active",
    !isCommercial
  );


  commercialForm?.classList.toggle(
    "active",
    isCommercial
  );


  if (isCommercial) {


    if (formTitle) {

      formTitle.innerHTML =
        `
          INTERESSE<br>
          <i>COMERCIAL.</i>
        `;

    }


    if (formDescription) {

      formDescription.textContent =
        "Conte um pouco sobre sua marca e como gostaria de participar.";

    }


  } else {


    if (formTitle) {

      formTitle.innerHTML =
        `
          INSCRIÇÃO<br>
          <i>VISITANTE.</i>
        `;

    }


    if (formDescription) {

      formDescription.textContent =
        "Preencha seus dados para participar do evento.";

    }


  }


  setTimeout(
    () => {

      formSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    },
    70
  );


}



/* =========================================================
   BOTÕES DE ESCOLHA
========================================================= */

choiceButtons.forEach(
  (button) => {


    button.addEventListener(
      "click",
      () => {

        openForm(
          button.dataset.form
        );

      }
    );


    button.addEventListener(
      "touchstart",
      () => {

        button.classList.add(
          "touch-hover"
        );

      },
      {
        passive: true
      }
    );


    button.addEventListener(
      "touchend",
      () => {

        setTimeout(
          () => {

            button.classList.remove(
              "touch-hover"
            );

          },
          200
        );

      },
      {
        passive: true
      }
    );


  }
);



/* =========================================================
   06. ENVIO DOS FORMULÁRIOS
========================================================= */

[
  visitorForm,
  commercialForm
]
.forEach((form) => {


  if (!form) {
    return;
  }


  form.addEventListener(
    "submit",
    (event) => {


      event.preventDefault();


      if (!form.checkValidity()) {

        form.reportValidity();

        return;

      }


      const isCommercial =
        form.id ===
        "commercial-form";


      visitorForm?.classList.remove(
        "active"
      );


      commercialForm?.classList.remove(
        "active"
      );


      if (formHeading) {

        formHeading.style.display =
          "none";

      }


      if (success) {

        success.hidden = false;

      }



      /* COMERCIAL */

      if (isCommercial) {


        if (successMascot) {

          successMascot.src =
            "assets/brand/mascote-explosao.png";

        }


        if (successKicker) {

          successKicker.textContent =
            "interesse recebido!";

        }


        if (successTitle) {

          successTitle.innerHTML =
            `
              Vamos conversar<br>
              sobre sua marca.
            `;

        }


        if (successDescription) {

          successDescription.textContent =
            "Recebemos seu interesse comercial. Nossa equipe analisará as informações e entrará em contato com os próximos passos.";

        }


      }


      /* VISITANTE */

      else {


        if (successMascot) {

          successMascot.src =
            "assets/brand/mascote-estrela.png";

        }


        if (successKicker) {

          successKicker.textContent =
            "inscrição confirmada!";

        }


        if (successTitle) {

          successTitle.innerHTML =
            `
              Você está<br>
              no Inspira FAM.
            `;

        }


        if (successDescription) {

          successDescription.textContent =
            "Sua inscrição como visitante foi registrada. Agora é só se preparar para viver a experiência.";

        }


      }


      setTimeout(
        () => {

          success?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        },
        100
      );


    }
  );


});



/* =========================================================
   07. MAPA INTERATIVO
========================================================= */

const mapZones =
  document.querySelectorAll(
    ".map-zone"
  );


const mapModal =
  document.getElementById(
    "map-modal"
  );


const mapModalNumber =
  document.getElementById(
    "map-modal-number"
  );


const mapModalTitle =
  document.getElementById(
    "map-modal-title"
  );


const mapModalText =
  document.getElementById(
    "map-modal-text"
  );


const mapModalClose =
  document.querySelector(
    ".map-modal-close"
  );


const mapModalAction =
  document.getElementById(
    "map-modal-action"
  );



/* =========================================================
   LIMPAR ÁREAS
========================================================= */

function clearMapZones() {

  mapZones.forEach(
    (zone) => {

      zone.classList.remove(
        "map-zone-active"
      );

    }
  );

}



/* =========================================================
   ATIVAR ÁREA
========================================================= */

function activateMapZone(zone) {


  clearMapZones();


  if (!zone) {
    return;
  }


  zone.classList.add(
    "map-zone-active"
  );


}



/* =========================================================
   ABRIR MODAL DO MAPA
========================================================= */

function openMapModal(zone) {


  if (
    !zone ||
    !mapModal
  ) {

    return;

  }


  activateMapZone(zone);


  if (mapModalNumber) {

    mapModalNumber.textContent =
      zone.dataset.mapNumber || "";

  }


  if (mapModalTitle) {

    mapModalTitle.textContent =
      zone.dataset.mapTitle || "";

  }


  if (mapModalText) {

    mapModalText.textContent =
      zone.dataset.mapText || "";

  }


  mapModal.dataset.tone =
    zone.dataset.mapTone || "";


  if (
    typeof mapModal.showModal ===
    "function"
  ) {

    mapModal.showModal();

  }


}



/* =========================================================
   INTERAÇÃO DAS ÁREAS DO MAPA
========================================================= */

mapZones.forEach(
  (zone, index) => {


    zone.style.setProperty(
      "--zone-delay",
      `${index * 100}ms`
    );


    zone.classList.add(
      "map-zone-ready"
    );


    zone.addEventListener(
      "mouseenter",
      () => {

        activateMapZone(zone);

      }
    );


    zone.addEventListener(
      "mouseleave",
      () => {

        zone.classList.remove(
          "map-zone-active"
        );

      }
    );


    zone.addEventListener(
      "touchstart",
      () => {

        activateMapZone(zone);

      },
      {
        passive: true
      }
    );


    zone.addEventListener(
      "click",
      () => {

        openMapModal(zone);

      }
    );


  }
);



/* =========================================================
   08. DESLIZAR NO MAPA — MOBILE
========================================================= */

document.addEventListener(
  "touchmove",
  (event) => {


    if (!mapZones.length) {
      return;
    }


    const touch =
      event.touches[0];


    if (!touch) {
      return;
    }


    const element =
      document.elementFromPoint(
        touch.clientX,
        touch.clientY
      );


    const zone =
      element?.closest(
        ".map-zone"
      );


    if (zone) {

      activateMapZone(zone);

    }


  },
  {
    passive: true
  }
);



document.addEventListener(
  "touchend",
  () => {


    if (!mapZones.length) {
      return;
    }


    setTimeout(
      clearMapZones,
      200
    );


  },
  {
    passive: true
  }
);



/* =========================================================
   09. LEGENDA DO MAPA
========================================================= */

document
  .querySelectorAll(
    "[data-map-jump]"
  )
  .forEach((button) => {


    button.addEventListener(
      "click",
      () => {


        const name =
          button.dataset.mapJump;


        const zone =
          document.querySelector(
            `[data-map-zone="${name}"]`
          );


        if (!zone) {
          return;
        }


        activateMapZone(zone);


        zone.classList.add(
          "map-zone-pulse"
        );


        zone.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });


        setTimeout(
          () => {

            zone.classList.remove(
              "map-zone-pulse"
            );

          },
          1200
        );


      }
    );


  });



/* =========================================================
   10. FECHAR MODAL DO MAPA
========================================================= */

mapModalClose
  ?.addEventListener(
    "click",
    () => {

      mapModal?.close();

    }
  );


mapModalAction
  ?.addEventListener(
    "click",
    () => {

      mapModal?.close();

    }
  );



/* =========================================================
   11. FECHAR MODAIS CLICANDO FORA
========================================================= */

function closeDialogOnBackdrop(dialog) {


  if (!dialog) {
    return;
  }


  dialog.addEventListener(
    "click",
    (event) => {


      if (
        event.target === dialog
      ) {

        dialog.close();

      }


    }
  );


}


closeDialogOnBackdrop(
  experienceModal
);


closeDialogOnBackdrop(
  mapModal
);



/* =========================================================
   FECHAR MODAIS COM ESC
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {


    if (
      event.key !==
      "Escape"
    ) {

      return;

    }


    if (
      experienceModal?.open
    ) {

      experienceModal.close();

    }


    if (
      mapModal?.open
    ) {

      mapModal.close();

    }


  }
);



/* =========================================================
   12. PROGRAMAÇÃO
========================================================= */

const scheduleTabs =
  document.querySelectorAll(
    "[data-schedule]"
  );


const schedulePanels =
  document.querySelectorAll(
    "[data-schedule-panel]"
  );


function changeSchedule(day) {


  scheduleTabs.forEach(
    (tab) => {


      const active =
        tab.dataset.schedule ===
        day;


      tab.classList.toggle(
        "active",
        active
      );


      tab.setAttribute(
        "aria-selected",
        active
          ? "true"
          : "false"
      );


    }
  );


  schedulePanels.forEach(
    (panel) => {


      const active =
        panel.dataset.schedulePanel ===
        day;


      panel.classList.toggle(
        "active",
        active
      );


      panel.hidden =
        !active;


    }
  );


}



scheduleTabs.forEach(
  (tab) => {


    tab.addEventListener(
      "click",
      () => {

        changeSchedule(
          tab.dataset.schedule
        );

      }
    );


  }
);



/* =========================================================
   CORRIGE O ESTADO INICIAL DA PROGRAMAÇÃO
========================================================= */

if (
  scheduleTabs.length &&
  schedulePanels.length
) {


  const initialTab =
    document.querySelector(
      "[data-schedule].active"
    ) ||
    scheduleTabs[0];


  if (initialTab) {

    changeSchedule(
      initialTab.dataset.schedule
    );

  }


}



/* =========================================================
   FAQ
========================================================= */

/*
   A página FAQ utiliza <details> e <summary>.

   O navegador já controla:
   - abrir e fechar;
   - teclado;
   - acessibilidade;
   - funcionamento no celular.

   Por isso não é necessário JavaScript
   específico para o FAQ.
*/



/* =========================================================
   FIM — INSPIRA FAM EXPERIENCE
========================================================= */