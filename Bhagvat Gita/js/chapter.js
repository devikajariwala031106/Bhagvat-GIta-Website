const params = new URLSearchParams(window.location.search)
const ch = params.get("ch") || 1

const bc = document.getElementById("bc")
const title = document.getElementById("chapterTitle")
const sub = document.getElementById("chapterSub")
const summary = document.getElementById("chapterSummary")
const versesGrid = document.getElementById("versesGrid")

fetch(`https://vedicscriptures.github.io/chapter/${ch}`)
    .then(res => res.json())
    .then(data => {
        bc.innerText = data.chapter_number
        title.innerText = `Chapter ${data.chapter_number}: ${data.name}`
        sub.innerText = `${data.translation} · ${data.verses_count} Verses`
        summary.innerText = data.chapter_summary

        versesGrid.innerHTML = ""
        for (let i = 1; i <= data.verses_count; i++) {
            const box = document.createElement("div")
            box.innerText = i
            box.onclick = () => loadVerse(ch, i)
            versesGrid.appendChild(box)
        }
    })

function loadVerse(ch, v) {
    fetch(`https://vedicscriptures.github.io/slok/${ch}/${v}`)
        .then(res => res.json())
        .then(d => {
            const english =
                d.tej?.et ||
                d.siva?.et ||
                d.chinmay?.et ||
                d.rams?.et ||
                "English translation not available."

            summary.innerHTML = `
        <h3>Verse ${v}</h3>
        <p><b>Sanskrit:</b><br>${d.slok}</p><br>
        <p><b>Hindi:</b><br>${d.tej?.ht || "Hindi not available."}</p><br>
        <p><b>English:</b><br>${english}</p>
      `
        })
}
