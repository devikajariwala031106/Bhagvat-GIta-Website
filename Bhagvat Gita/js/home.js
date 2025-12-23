fetch("https://vedicscriptures.github.io/chapters")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("chapters")

        data.forEach(ch => {
            const card = document.createElement("div")
            card.className = "chapter-card"

            card.innerHTML = `
        <h3>Chapter ${ch.chapter_number}</h3>
        <p>${ch.name}</p>
        <small>${ch.translation}</small>
      `

            card.onclick = () => {
                location.href = `chapter.html?ch=${ch.chapter_number}`
            }

            container.appendChild(card)
        })
    })
