module ApplicationHelper

  def csrf_protection
    <<-HTML.html_safe
      <input
        type="hidden"
        name="authenticity_token"
        value="#{form_authenticity_token}"
      >
    HTML
  end
end
