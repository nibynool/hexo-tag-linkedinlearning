# Hexo Tag: LinkedIn Learning

## What is it?

A tag interpreter for [Hexo](https://hexo.io) static site generator to add a `{% linkedinlearning %}` template tag to
embed [LinkedIn Learning](https://learning.linkedin.com/) videos in a post.

## Why does it exist?

I created this custom tag as I wanted to embed LinkedIn Learning videos in a post on my personal blog.  Although I could
do this with the raw HTML code provided by LinkedIn Learning I have enforced the exclusion of HTML in my Markdown
validation.  This plugin allows me to embed the video with consistent formatting and without using HTML.

## Installation

1. Run `npm i @nibynool\hexo-tag-linkedin-learning` in your Hexo directory

## Usage

1. Locate the LinkedIn Learning video you want to embed
2. Click on the sharing link in the top right corner of the video
3. If you have not already unlocked the video click `Unlock Video to Embed` (this will use one of your 5 embeds per
   month), if you've previously unlocked it, simply click `Get Embed Code`
4. You will get some HTML similar to the following (line breaks have been added for improved display)
   ```html
   <div style="position:relative;height:0;padding-bottom:56.25%"><iframe width="640" height="360"
   src="https://www.linkedin.com/learning/embed/agile-product-owner-role-foundations/welcome?clai
   m=AQHDSL48YFfJcQAAAW9EkGiTI5mQV2m9YxzzLR1oHFGrAGBwNkSZYab33c0q4u27LXtY-jpvtILDhI9mAuoOdyWZYojm
   zhhiIc-_bsSRXOQ0UtERufqc6P7vzf2LVPRZkmexg5rxci8Tzgka2D3f3EQdncgfuRmZQivQCIXY9nKKJ0xYa1LJeLJCPI
   Y0obRWLFgZ02IaiYbms8EtJAEnwWyH3PU2VWanW5zIgWL0FctkQ7JA_-q8gxlOo6Yayrornz3zDsfKfmOj6AWFCDpDNm6q
   R3Pjm3-jWt3Kyj5OsRFqbtfqqI5VaJaqjvN4c4XNg0h8_SzPQT1SHJJnDVU60jt5vRn9263Fs_UCd49Qiq4vzIEwJdcFNp
   CqVBb6Yaao1m4BYwuIFQ8UVAoI6LaOZqfYIw-kXJ-ld9Ie9VbkO4JrUu1QggWAOXO3P9zs6RN9bMDr2e8XWcRxFfD4lTPK
   g8A0URPOxXJJqwgTQy1SeYsTMMc5OGfPh1pNY9VxtlQ2HG8kn8MGPeGe1DPYFYnBbvkm9aCNJrQDkRLf_URsd5Perb9hoC
   TVR1MS8dD88pyVym9_1aNTp3umbNvS-YHTji41vLbY4DIulD4aVhrTsVTxbhWhjBIbxrqVLcl8LdjxE4wwJZpVnsPoiBCO
   A3sxSvGYtiQPe_xmsic0SBhgVC2CFPAOJ6nIw0A3_7Qe7Bm3i3n_Nij-n2NYrvP3JcM-5IQ3wW_micpiaGdc-JezMrAg0g
   " mozallowfullscreen="true" webkitallowfullscreen="true" allowfullscreen="true" frameborder="0
   " style="position:absolute;width:100%;height:100%;left:0"></iframe></div><p><strong><a href="h
   ttps://www.linkedin.com/learning/agile-product-owner-role-foundations/welcome?trk=embed_lil" t
   itle="Welcome">Welcome</a></strong> from <strong><a href="https://www.linkedin.com/learning/ag
   ile-product-owner-role-foundations?trk=embed_lil" title="Learn what it takes to be the product
   owner on an agile project team. This course clarifies the role of the product owner and looks
   at the mindset, techniques, and competencies critical to being successful in the job.">Agile
   Product Owner Role: Foundations</a></strong> by <strong><a href="https://www.linkedin.com/lear
   ning/instructors/angela-wick?trk=embed_lil">Angela Wick</a></strong></p>
   ```
5. Using the data from the embed code the tag can be created:
   ```markdown
   {% linkedinlearning
      width=640
      height=480
      author="Doug Rose"
      series="Agile at Work: Getting Better with Agile Retrospectives"
      video="How to run a PANCAKE retrospective"
      claim="AQEXLrRh7XsQlAAAAW7Jw9rJsiLR8FxunekfOnL2mvDfpE0tpxBq-k2bDHOotIxpASf1IkgTT4DkCoaGzcD5kqM2
             rmtHPQJ4-b6AlrhcXYY31rs-yBCjveIuBNRpFmMbtRTIgvBXONrHAeNnjJ6LfF9gBheu7kEtynPuLnqkevik5CaT
             3BckD5Su1OUm0TGytzpEX-wFwd5zeMH24eTY7C-vS9ToxYij2d87Kt1OLEWjvSwY4XeotuNOzIpi0lz1gFlaKtYe
             AQimYnH7Ut86Ndx3P-4GFdKC0Yujy_HwCO8bZPw6rwwEvAGBAYlgxMtskP2c3OTiV_CIWhiGnpexEIERuRTv4hu0
             jSVeSufQbKc3EOvFlw-J6v02PIiDj43pshFFKcsjPaGB6B2W16V3YAtVUVUTHDpE4tzycbbJ6UMKi9BE8QVoiKi6
             JAGuk91_fbRysnwbZOsKdJI-FcYfePZNV-RB0z2Xavt14MMZdIJJqtg4oB0UqA9UvOMB1oSwTTq5I-lm4I4I285Z
             ZgwK-J66QdMOR-u6sPd2CC6BxhsSKUYN59TJLqCi-_N8cjqnVW8frWIC07c4uUQEMVniZvO-FcCjJ1QH-47Iau8a
             sO1rxQKGQIRL2zpDDd6LAMs56vc5L4UQGLF4rFnX4XfFO-DH-3lbIgMFI3e2E-AfGUVTVSSMka2K5w_zQa7obGJg
             pBC7XvvHzbtukxRS_GbTsL2CMpvFoZDojVp7cVbHTaRJIA"
      seriesDescription="In this final course of the Agile at Work series, explore the singular value
                         of conducting an agile retrospective at the conclusion of every sprint."
      target="_blank"
   %}
   ```
   
   ### Notes

   * When defining the tag, the `width` and `height` are user defined.
   * The `author` value must match the name used in the instructors link as it is used to generate the URL.
   * The `series` must be extracted from the series link as it is used to generate the URL.
   * For a series link to be displayed a `seriesDescription` must be defined, it can be different to the one LinkedIn
     Learning provides.
   * The value for `video` must match the value used in the embed code.
   * A `claim` must match the value provided within the `iframe` `src` exactly, but it allows for the addition of new
     lines and whitespace.
